import EventEmitter from "events";
import { File } from "formdata-node";
import fs from "fs";
import { nodewhisper } from "nodejs-whisper";
import OpenAI from "openai";
import os from "os";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { getWavHeader } from "../clients/elevenlabs/index.ts";
import settings from "../core/settings.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class TranscriptionService extends EventEmitter {
  private CONTENT_CACHE_DIR = "./content_cache";
  private isCudaAvailable: boolean = false;
  private openai: OpenAI | null = null;

  constructor() {
    super();
    this.ensureCacheDirectoryExists();
    if (settings.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: settings.OPENAI_API_KEY,
      });
    } else {
      this.detectCuda();
    }
  }

  private ensureCacheDirectoryExists() {
    if (!fs.existsSync(this.CONTENT_CACHE_DIR)) {
      fs.mkdirSync(this.CONTENT_CACHE_DIR);
    }
  }

  private detectCuda() {
    const platform = os.platform();
    if (platform === "linux") {
      try {
        fs.accessSync("/usr/local/cuda/bin/nvcc", fs.constants.X_OK);
        this.isCudaAvailable = true;
        console.log("CUDA detected. Transcription will use CUDA acceleration.");
      } catch (error) {
        console.log("CUDA not detected. Transcription will run on CPU.");
      }
    } else if (platform === "win32") {
      const cudaPath = path.join(
        process.env.CUDA_PATH ||
          "C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.0",
        "bin",
        "nvcc.exe",
      );
      if (fs.existsSync(cudaPath)) {
        this.isCudaAvailable = true;
        console.log("CUDA detected. Transcription will use CUDA acceleration.");
      } else {
        console.log("CUDA not detected. Transcription will run on CPU.");
      }
    } else {
      console.log(
        "CUDA not supported on this platform. Transcription will run on CPU.",
      );
    }
  }

  public async transcribe(audioBuffer: ArrayBuffer): Promise<string | null> {
    if (this.openai) {
      return this.transcribeWithOpenAI(audioBuffer);
    } else {
      return this.transcribeLocally(audioBuffer);
    }
  }

  private async transcribeWithOpenAI(
    audioBuffer: ArrayBuffer,
  ): Promise<string | null> {
    console.log("Transcribing audio with OpenAI...");

    const wavHeader = getWavHeader(audioBuffer.byteLength, 16000);
    const file = new File([wavHeader, audioBuffer], "audio.wav", {
      type: "audio/wav",
    });

    try {
      const result = await this.openai!.audio.transcriptions.create({
        model: "whisper-1",
        language: "en",
        response_format: "text",
        file: file,
      });

      const trimmedResult = (result as any).trim();
      console.log(`OpenAI speech to text: ${trimmedResult}`);

      return trimmedResult;
    } catch (error) {
      console.error("Error in OpenAI speech-to-text conversion:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      return null;
    }
  }

  public async transcribeLocally(audioBuffer: ArrayBuffer): Promise<string | null> {
    try {
      const fullPath = path.join(__dirname, "../../", this.CONTENT_CACHE_DIR);
      const tempWavFile = path.join(fullPath, `temp_${Date.now()}.wav`);
  
      // Create a WAV file from the audio buffer
      const wavHeader = getWavHeader(audioBuffer.byteLength, 16000);
      const wavBuffer = Buffer.concat([wavHeader, Buffer.from(audioBuffer)]);
      fs.writeFileSync(tempWavFile, wavBuffer);
  
      // Perform the transcription using nodejs-whisper
      let output = await nodewhisper(tempWavFile, {
        modelName: "base.en",
        autoDownloadModelName: "base.en",
        verbose: true,
        removeWavFileAfterTranscription: false,
        withCuda: this.isCudaAvailable,
        whisperOptions: {
          outputInText: true,
          outputInVtt: false,
          outputInSrt: false,
          outputInCsv: false,
          translateToEnglish: false,
          wordTimestamps: false,
          timestamps_length: 60,
          splitOnWord: true,
        },
      });
  
      // Process the output
      output = output
        .split("\n")
        .map((line) => {
          if (line.trim().startsWith("[")) {
            const endIndex = line.indexOf("]");
            return line.substring(endIndex + 1);
          }
          return line;
        })
        .join("\n");
  
      // Remove the temporary WAV file
      fs.unlinkSync(tempWavFile);
  
      if (!output || output.length < 5) {
        return null;
      }
      return output;
    } catch (error) {
      console.error("Error in speech-to-text conversion:", error);
      return null;
    }
  }
}
