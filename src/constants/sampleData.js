export const sampleChats = [
  {
    avatar: [
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    ],
    name: "Elon musk",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    ],
    name: "Bhagyesh",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: [
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    ],
    name: "Bhagyesh",
    _id: "1",
  },
  {
    avatar: [
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    ],
    name: "Nilima Gawande",
    _id: "2",
  },
];

export const sampleNoitfication = [
  {
    sender: {
      avatar: [
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
      ],
      name: "Bhagyesh",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: [
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
      ],
      name: "Nilu",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachment: [
      {
        public_id: "5156864868",
        url: "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      },
    ],
    content: "This is simple message",
    _id: "12",
    sender: {
      _id: "user.id",
      name: "Sender Name",
    },
    chat: "ChatId",
    createdAt: "2024-03-19T12:00:22.757Z",
  },
  {
    attachment: [
      {
        public_id: "14654846",
        url: "newurl.mp3",
      },
    ],
    content: "This is simple message vekha",
    _id: "vekha",
    sender: {
      _id: "vekha",
      name: "Sender Name vekha",
    },
    chat: "ChatId vekha",
    createdAt: "2024-03-19T13:00:22.757Z",
  },
];

export const dashboardData = {
  users: [
    {
      _id: 1,
      name: "John",
      avatar:
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      username: "Jhonny",
      friends: 20,
      groups: 3,
    },
    {
      _id: 2,
      name: "DOe",
      avatar:
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      username: "Doww",
      friends: 10,
      groups: 5,
    },
    {
      _id: 3,
      name: "6pp",
      avatar:
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      username: "PP6",
      friends: 100,
      groups: 25,
    },
    {
      _id: 4,
      name: "6pp",
      avatar:
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      username: "PP6",
      friends: 100,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "BNG",
      avatar: [
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      ],
      _id: 1,
      groupChat: false,
      members: [
        {
          _id: 1,
          avatar:
            "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
        },
        {
          _id: 2,
          avatar:
            "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
        },
      ],
      totalMember: 15,
      totalMessages: 20,
      creator: {
        name: "BNG",
        avatar:
          "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      },
    },
    {
      name: "Shree",
      avatar: [
        "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      ],
      _id: 2,
      groupChat: false,
      members: [
        {
          _id: 1,
          avatar:
            "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
        },
        {
          _id: 2,
          avatar:
            "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
        },
      ],
      totalMember: 18,
      totalMessages: 10,
      creator: {
        name: "Shreee",
        avatar:
          "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      },
    },
  ],

  messages: [
    {
      attachment: [],
      content: "content hai yaha",
      _id: "56516v5fv",
      sender: {
        name: "user",
        avatar:
          "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
      },
      chat: "ChatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.6730z",
    },
    {
      attachment: [
        {
          public_id: "anciksdfjk",
          url: "https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg",
        },
      ],
      content: "content hai 2 ka",
      _id: "5651asdv",
      sender: {
        name: "layna",
        avatar: "",
      },
      chat: "ChatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.6730z",
    },
  ],
};
