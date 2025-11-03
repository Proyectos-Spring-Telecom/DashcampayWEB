export interface Color {
  label: string;
  backgroundColor: string;
  backgroundContrastColor: '!text-black' | '!text-white';
  textColor: string;
}

export const colors: Color[] = [
  {
    label: 'red',
    backgroundColor: '!bg-red-600',
    backgroundContrastColor: '!text-white',
    textColor: '!text-red-600'
  },
  {
    label: 'green',
    backgroundColor: '!bg-green-600',
    backgroundContrastColor: '!text-white',
    textColor: '!text-green-600'
  },
  {
    label: 'amber',
    backgroundColor: '!bg-amber-600',
    backgroundContrastColor: '!text-black',
    textColor: '!text-amber-600'
  },
  {
    label: 'orange',
    backgroundColor: '!bg-orange-600',
    backgroundContrastColor: '!text-black',
    textColor: '!text-orange-600'
  },
  {
    label: 'purple',
    backgroundColor: '!bg-purple-600',
    backgroundContrastColor: '!text-white',
    textColor: '!text-purple-600'
  },
  {
    label: 'cyan',
    backgroundColor: '!bg-cyan-600',
    backgroundContrastColor: '!text-black',
    textColor: '!text-cyan-600'
  },
  {
    label: 'teal',
    backgroundColor: '!bg-teal-600',
    backgroundContrastColor: '!text-white',
    textColor: '!text-teal-600'
  },
  {
    label: 'gray',
    backgroundColor: '!bg-gray-600',
    backgroundContrastColor: '!text-black',
    textColor: '!text-gray-600'
  }
];
