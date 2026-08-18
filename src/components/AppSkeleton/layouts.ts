export const homeSkeletonLayout = [
  // Header
  { key: 'header', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, children: [
    { key: 'title', gap: 6, children: [
      { key: 'greet', width: 100, height: 16, borderRadius: 4 },
      { key: 'name', width: 150, height: 28, borderRadius: 6 }
    ]},
    { key: 'profile', width: 48, height: 48, borderRadius: 24 }
  ]},
  // Accounts section
  { key: 'accountsTitle', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, children: [
    { key: 't1', width: 100, height: 20, borderRadius: 4 },
    { key: 'btn1', width: 28, height: 28, borderRadius: 14 }
  ]},
  { key: 'carousel', width: '100%', height: 180, borderRadius: 20, marginTop: 12 },
  { key: 'dots', flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12, children: [
    { key: 'd1', width: 16, height: 6, borderRadius: 3 },
    { key: 'd2', width: 6, height: 6, borderRadius: 3 },
    { key: 'd3', width: 6, height: 6, borderRadius: 3 }
  ]},
  // Cash row
  { key: 'cashRow', width: '100%', height: 72, borderRadius: 20, marginTop: 16 },
  // Summary section
  { key: 'summaryTitle', width: 80, height: 20, borderRadius: 4, marginTop: 24 },
  { key: 'summaryRow', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, children: [
    { key: 'c1', width: '31%', height: 120, borderRadius: 20 },
    { key: 'c2', width: '31%', height: 120, borderRadius: 20 },
    { key: 'c3', width: '31%', height: 120, borderRadius: 20 }
  ]},
  // Recent activity
  { key: 'recentTitle', flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, children: [
    { key: 't2', width: 120, height: 20, borderRadius: 4 },
    { key: 'lnk', width: 60, height: 16, borderRadius: 4 }
  ]},
  { key: 'recentList', gap: 12, marginTop: 12, children: [
    { key: 'r1', flexDirection: 'row', alignItems: 'center', height: 60, borderRadius: 16, paddingHorizontal: 12, gap: 12, children: [
      { key: 'ri1', width: 36, height: 36, borderRadius: 18 },
      { key: 'rt1', gap: 4, children: [
        { key: 'rt1_t', width: 100, height: 16, borderRadius: 4 },
        { key: 'rt1_s', width: 80, height: 12, borderRadius: 4 }
      ]}
    ]},
    { key: 'r2', flexDirection: 'row', alignItems: 'center', height: 60, borderRadius: 16, paddingHorizontal: 12, gap: 12, children: [
      { key: 'ri2', width: 36, height: 36, borderRadius: 18 },
      { key: 'rt2', gap: 4, children: [
        { key: 'rt2_t', width: 120, height: 16, borderRadius: 4 },
        { key: 'rt2_s', width: 70, height: 12, borderRadius: 4 }
      ]}
    ]}
  ]}
];

export const addTransactionSkeletonLayout = [
  { key: 'header', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, children: [
    { key: 'back', width: 44, height: 44, borderRadius: 22 },
    { key: 'title', width: 140, height: 28, borderRadius: 6, marginLeft: 16 },
    { key: 'avatar', width: 44, height: 44, borderRadius: 22 }
  ]},
  { key: 'amountGroup', gap: 8, marginTop: 16, children: [
    { key: 'amountLabel', width: 80, height: 16, borderRadius: 4 },
    { key: 'amountInput', width: '100%', height: 58, borderRadius: 14 }
  ]},
  { key: 'categoryGroup', gap: 8, marginTop: 16, children: [
    { key: 'categoryLabel', width: 80, height: 16, borderRadius: 4 },
    { key: 'categoryInput', width: '100%', height: 54, borderRadius: 14 }
  ]},
  { key: 'descGroup', gap: 8, marginTop: 16, children: [
    { key: 'descLabel', width: 120, height: 16, borderRadius: 4 },
    { key: 'descInput', width: '100%', height: 64, borderRadius: 14 }
  ]},
  { key: 'fromGroup', gap: 8, marginTop: 16, children: [
    { key: 'fromLabel', width: 80, height: 16, borderRadius: 4 },
    { key: 'fromInput', width: '100%', height: 58, borderRadius: 14 }
  ]},
  { key: 'dateGroup', gap: 8, marginTop: 16, children: [
    { key: 'dateLabel', width: 80, height: 16, borderRadius: 4 },
    { key: 'dateInput', width: '100%', height: 54, borderRadius: 14 }
  ]},
  { key: 'notesGroup', gap: 8, marginTop: 16, children: [
    { key: 'notesLabel', width: 100, height: 16, borderRadius: 4 },
    { key: 'notesInput', width: '100%', height: 90, borderRadius: 14 }
  ]},
  { key: 'submitButton', width: '100%', height: 52, borderRadius: 24, marginTop: 24 }
];

export const addAccountSkeletonLayout = [
  { key: 'header', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, children: [
    { key: 'back', width: 44, height: 44, borderRadius: 22 },
    { key: 'title', width: 140, height: 28, borderRadius: 6, marginLeft: 16 },
    { key: 'avatar', width: 44, height: 44, borderRadius: 22 }
  ]},
  { key: 'typeGroup', width: '100%', height: 48, borderRadius: 14, marginTop: 16 },
  { key: 'brandGroup', width: '100%', height: 58, borderRadius: 14, marginTop: 16 },
  { key: 'nameGroup', width: '100%', height: 58, borderRadius: 14, marginTop: 16 },
  { key: 'amountGroup', width: '100%', height: 58, borderRadius: 14, marginTop: 16 },
  { key: 'colorGroup', width: '100%', height: 60, borderRadius: 14, marginTop: 16 },
  { key: 'submitBtn', width: '100%', height: 52, borderRadius: 24, marginTop: 24 }
];

export const addCashSkeletonLayout = [
  { key: 'header', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, children: [
    { key: 'back', width: 44, height: 44, borderRadius: 22 },
    { key: 'title', width: 140, height: 28, borderRadius: 6, marginLeft: 16 },
    { key: 'avatar', width: 44, height: 44, borderRadius: 22 }
  ]},
  { key: 'nameGroup', width: '100%', height: 58, borderRadius: 14, marginTop: 16 },
  { key: 'amountGroup', width: '100%', height: 58, borderRadius: 14, marginTop: 16 },
  { key: 'colorGroup', width: '100%', height: 60, borderRadius: 14, marginTop: 16 },
  { key: 'submitBtn', width: '100%', height: 52, borderRadius: 24, marginTop: 24 }
];

export const addCategoriesSkeletonLayout = [
  { key: 'header', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, children: [
    { key: 'back', width: 44, height: 44, borderRadius: 22 },
    { key: 'title', width: 140, height: 28, borderRadius: 6, marginLeft: 16 },
    { key: 'avatar', width: 44, height: 44, borderRadius: 22 }
  ]},
  { key: 'searchBar', width: '100%', height: 50, borderRadius: 14, marginTop: 16 },
  { key: 'grid', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16, children: [
    { key: 'i1', width: '48%', height: 50, borderRadius: 12 },
    { key: 'i2', width: '48%', height: 50, borderRadius: 12 },
    { key: 'i3', width: '48%', height: 50, borderRadius: 12 },
    { key: 'i4', width: '48%', height: 50, borderRadius: 12 },
    { key: 'i5', width: '48%', height: 50, borderRadius: 12 },
    { key: 'i6', width: '48%', height: 50, borderRadius: 12 }
  ]}
];

export const statsSkeletonLayout = [
  { key: 'header', width: 140, height: 28, borderRadius: 6, marginVertical: 16 },
  { key: 'chart', width: '100%', height: 220, borderRadius: 20, marginTop: 12 },
  { key: 'title', width: 120, height: 20, borderRadius: 4, marginTop: 24 },
  { key: 'list', gap: 12, marginTop: 12, children: [
    { key: 'r1', width: '100%', height: 64, borderRadius: 16 },
    { key: 'r2', width: '100%', height: 64, borderRadius: 16 },
    { key: 'r3', width: '100%', height: 64, borderRadius: 16 }
  ]}
];

export const settingsSkeletonLayout = [
  { key: 'header', width: 140, height: 28, borderRadius: 6, marginVertical: 16 },
  { key: 'section1', width: '100%', height: 140, borderRadius: 20, marginTop: 16 },
  { key: 'section2', width: '100%', height: 180, borderRadius: 20, marginTop: 16 }
];

export const chatSkeletonLayout = [
  { key: 'header', width: 140, height: 28, borderRadius: 6, marginVertical: 16 },
  { key: 'messages', gap: 16, marginTop: 16, children: [
    { key: 'm1', width: '70%', height: 44, borderRadius: 16, alignSelf: 'flex-start' },
    { key: 'm2', width: '60%', height: 44, borderRadius: 16, alignSelf: 'flex-end' },
    { key: 'm3', width: '75%', height: 54, borderRadius: 16, alignSelf: 'flex-start' }
  ]},
  { key: 'input', width: '100%', height: 52, borderRadius: 26, marginTop: 24 }
];
