export type Event = {
  "version": "0.1.0",
  "name": "event",
  "instructions": [
    {
      "name": "createEvent",
      "accounts": [
        {
          "name": "agency",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "singer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collectionToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMetadataPda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTimestamp",
          "type": "i64"
        },
        {
          "name": "endTimestamp",
          "type": "i64"
        },
        {
          "name": "winnersTotal",
          "type": "u16"
        },
        {
          "name": "singerName",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "goods",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "entryEvent",
      "accounts": [
        {
          "name": "participant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "event",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "agency",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recentSlotHashes",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "participants",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "singer",
            "type": "publicKey"
          },
          {
            "name": "startTimestamp",
            "type": "i64"
          },
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "participants",
            "type": "u32"
          },
          {
            "name": "winnersTotal",
            "type": "u16"
          },
          {
            "name": "winners",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "singerName",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "goods",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "publicKey"
          },
          {
            "name": "participant",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: Event = {
  "version": "0.1.0",
  "name": "event",
  "instructions": [
    {
      "name": "createEvent",
      "accounts": [
        {
          "name": "agency",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "singer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collectionToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMetadataPda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTimestamp",
          "type": "i64"
        },
        {
          "name": "endTimestamp",
          "type": "i64"
        },
        {
          "name": "winnersTotal",
          "type": "u16"
        },
        {
          "name": "singerName",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "goods",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "entryEvent",
      "accounts": [
        {
          "name": "participant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "event",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "entry",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "agency",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recentSlotHashes",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "participants",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "singer",
            "type": "publicKey"
          },
          {
            "name": "startTimestamp",
            "type": "i64"
          },
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "participants",
            "type": "u32"
          },
          {
            "name": "winnersTotal",
            "type": "u16"
          },
          {
            "name": "winners",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "singerName",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "goods",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "publicKey"
          },
          {
            "name": "participant",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
