export const initialPet = {
  name: "",
  type: "",
  breed: "",
  gender: "",
  age: "",
  color: "",
  size: "",
  description: "",
  personality: "",
  city: "",
  birthday: "",
  photo: null,
  records: []
}

export default function () {
  return {
    userId: 'ABC',
    online: true,
    routeName: 'ImBlue',
    pet: { ...initialPet },
  }
}
