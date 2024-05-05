import CommunityReducer, { setCommunities, setFollow } from "../communitySlice";
import { communityType } from "../../types/types";

let state: communityType = {
  Communities: [
    {
      id: 1,
      ownerId: 1,
      isFollowed: false,
      name: "Test #1",
    },
  ],
};

it("Community should be followed", async () => {
  let action = setFollow({ id: 1, isFollowed: true });

  let newState = CommunityReducer(state, action);

  expect(newState.Communities[0].isFollowed).toBe(true);
});

it("Communities should be set", async () => {
  let action = setCommunities([
    {
      id: 2,
      ownerId: 2,
      isFollowed: false,
      name: "Test #2",
    },
    {
      id: 3,
      ownerId: 3,
      isFollowed: true,
      name: "Test #3",
    },
    {
      id: 4,
      ownerId: 4,
      isFollowed: false,
      name: "Test #4",
    },
  ]);

  let newState = CommunityReducer(state, action);
  console.log(newState.Communities);
  expect(newState.Communities.length).toBe(3);
});
