const transitions = {
  TODO: ["IN_PROGRESS", "BLOCKED"],

  IN_PROGRESS: [
    "IN_REVIEW",
    "BLOCKED",
  ],

  IN_REVIEW: [
    "DONE",
    "BLOCKED",
  ],

  DONE: [],

  BLOCKED: [],
};

export const canMoveTo = (
  current: string,
  next: string
) => {
  return transitions[
    current as keyof typeof transitions
  ]?.includes(next);
};