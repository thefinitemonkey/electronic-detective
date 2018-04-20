export const testStore = {
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({
    playerId: 2,
    setupData: {
      characters: {
        3: { name: "Test character" }
      },
      locations: {
        A: { name: "Test location" }
      }
    },
    gameData: {
      victim: 3,
      scene: "A",
      sheets: {
        numPlayers: 3,
        2: {
          name: "Test",
          victim: 3,
          scene: "A",
          clueSelections: {
            sex: "",
            hiding: { side: "", town: "" },
            weapons: {
              used: "",
              ".45": { fingerprint: "" },
              ".38": { fingerprint: "" }
            }
          },
          suspectStatements: {},
          locations: {
            A: { address: { side: "", town: "" }, weapon: "", occupants:[] },
            C: { address: { side: "", town: "" }, weapon: "", occupants:[] },
            D: {
              address: { side: "", town: "" }
            },
            F: {
              address: { side: "", town: "" }
            }
          }
        }
      }
    }
  })
};
