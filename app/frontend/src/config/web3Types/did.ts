export type Did = {
  "version": "0.1.0",
  "name": "did",
  "instructions": [
    {
      "name": "issueCert",
      "accounts": [
        {
          "name": "server",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "upper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
          "name": "lowerId",
          "type": "i64"
        },
        {
          "name": "upperId",
          "type": "i64"
        }
      ]
    },
    {
      "name": "revokeCertLower",
      "accounts": [
        {
          "name": "lower",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "server",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "revokeCertUpper",
      "accounts": [
        {
          "name": "upper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "server",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "family",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lower",
            "type": "publicKey"
          },
          {
            "name": "upper",
            "type": "publicKey"
          },
          {
            "name": "lowerId",
            "type": "i64"
          },
          {
            "name": "upperId",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: Did = {
  "version": "0.1.0",
  "name": "did",
  "instructions": [
    {
      "name": "issueCert",
      "accounts": [
        {
          "name": "server",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "upper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
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
          "name": "lowerId",
          "type": "i64"
        },
        {
          "name": "upperId",
          "type": "i64"
        }
      ]
    },
    {
      "name": "revokeCertLower",
      "accounts": [
        {
          "name": "lower",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "server",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "revokeCertUpper",
      "accounts": [
        {
          "name": "upper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "server",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "family",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "family",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lower",
            "type": "publicKey"
          },
          {
            "name": "upper",
            "type": "publicKey"
          },
          {
            "name": "lowerId",
            "type": "i64"
          },
          {
            "name": "upperId",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
