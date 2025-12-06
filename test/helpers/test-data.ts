const randomNumber = (max: number): number => Math.floor(Math.random() * max)

export const generateTestEmail = (firstName: string) =>
  `${firstName}${randomNumber(100)}@example.com`

export const testUserData = {
  firstName: 'Lando',
  lastName: 'Norris',
  password: 'Mclaren4life!',
}

export const testPractitionerData = {
  name: 'Quadrant',
  description: 'Formula 1 Driver',
  contact: {
    phoneNumber: '2268579038',
    website: null,
    email: null,
    socialMedia: {
      instagram: 'http://instagram.com/ln4',
    },
  },
  services: [
    {
      name: 'Hot laps',
      description:
        "Get in the driver's seat and experience the thrill of a race lap around the track",
      online: false,
      inPerson: true,
    },
  ],
}

export const testBusinessData = {
  name: 'LN4 Inc',
  description: 'Parent company of Quadrant and all LN4 enterprises',
  addressLine1: '123 Test Lane',
  addressLine2: null,
  city: 'Glastonbury',
  region: 'Somerset',
  postalCode: 'GL12 5TL',
  country: 'United Kingdom',
  contact: {
    phoneNumber: '+44 60847275',
    website: null,
    email: null,
  }
}
