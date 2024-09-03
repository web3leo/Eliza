import dotenv from "dotenv";
import { createRuntime } from "../test_resources/createRuntime.ts";
import { type User } from "../test_resources/types.ts";
import { zeroUuid } from "./constants.ts";
import { createGoal, getGoals, updateGoal } from "./goals.ts";
import { AgentRuntime } from "./runtime.ts";
import { GoalStatus, type Goal, type UUID } from "./types.ts";

dotenv.config({ path: ".dev.vars" });
describe("Goals", () => {
  let runtime: AgentRuntime;
  let user: User;
  beforeAll(async () => {
    const result = await createRuntime({
      env: process.env as Record<string, string>,
    });
    runtime = result.runtime;
    user = result.session.user;
    await runtime.databaseAdapter.removeAllGoals(zeroUuid);
  });

  beforeEach(async () => {
    await runtime.databaseAdapter.removeAllGoals(zeroUuid);
  });

  afterAll(async () => {
    await runtime.databaseAdapter.removeAllGoals(zeroUuid);
  });

  test("createGoal - successfully creates a new goal", async () => {
    const newGoal: Goal = {
      name: "Test Create Goal",
      status: GoalStatus.IN_PROGRESS,
      roomId: zeroUuid,
      userId: user?.id as UUID,
      objectives: [
        {
          description: "Test Objective",
          completed: false,
        },
      ],
    };

    await createGoal({
      runtime,
      goal: newGoal,
    });

    // Verify the goal is created in the database
    const goals = await getGoals({
      runtime,
      userId: user?.id as UUID,
      roomId: zeroUuid,
      onlyInProgress: false,
    });

    const createdGoal = goals.find((goal: Goal) => goal.name === newGoal.name);

    expect(createdGoal).toBeDefined();
    expect(createdGoal?.status).toEqual("IN_PROGRESS");
    expect(createdGoal?.objectives.length).toBeGreaterThan(0);
  });

  // Updating an existing goal
  test("updateGoals - successfully updates an existing goal", async () => {
    const newGoal: Goal = {
      name: "Test Create Goal",
      status: GoalStatus.IN_PROGRESS,
      roomId: zeroUuid,
      userId: user?.id as UUID,
      objectives: [
        {
          description: "Test Objective",
          completed: false,
        },
      ],
    };

    await createGoal({
      runtime,
      goal: newGoal,
    });

    // retrieve the goal from the database
    let goals = await getGoals({
      runtime,
      roomId: zeroUuid,
      onlyInProgress: false,
    });
    const existingGoal = goals.find(
      (goal: Goal) => goal.name === newGoal.name,
    ) as Goal;
    const updatedGoal = { ...existingGoal, status: GoalStatus.DONE };
    await updateGoal({
      runtime,
      goal: updatedGoal,
    });

    // Verify the goal's status is updated in the database
    goals = await getGoals({
      runtime,
      roomId: zeroUuid,
      onlyInProgress: false,
    });

    const updatedGoalInDb = goals.find(
      (goal: Goal) => goal.id === existingGoal.id,
    );

    expect(updatedGoalInDb?.status).toEqual(GoalStatus.DONE);

    // Clean up the created goal
    if (existingGoal?.id) {
      await runtime.databaseAdapter.removeGoal(existingGoal.id);
    }
  });
});
