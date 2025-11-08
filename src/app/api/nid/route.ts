import { NextRequest, NextResponse } from "next/server";

// Fake data generator based on NID
function generateFakePersonDetails(nid: string) {
  // Use NID as seed for consistent fake data generation
  const seed = nid.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Generate consistent random values based on seed
  const random = (max: number, offset = 0) => {
    return (seed + offset) % max;
  };

  const firstNames = [
    "Mohammad",
    "Abdul",
    "Md",
    "Ahmed",
    "Fatima",
    "Ayesha",
    "Kamal",
    "Rahim",
    "Jamal",
    "Nasrin",
    "Shakib",
    "Tasnim",
    "Rafiq",
    "Sultana",
    "Hasan",
  ];

  const lastNames = [
    "Rahman",
    "Hossain",
    "Ahmed",
    "Ali",
    "Khan",
    "Islam",
    "Uddin",
    "Begum",
    "Chowdhury",
    "Akter",
    "Kabir",
    "Sultana",
    "Hassan",
    "Mahmud",
    "Miah",
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["male", "female"];
  const maritalStatuses = ["single", "married", "divorced", "widowed"];

  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Narayanganj",
  ];

  const districts = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Gazipur",
    "Narayanganj",
  ];

  // Generate consistent data
  const firstName = firstNames[random(firstNames.length)];
  const lastName = lastNames[random(lastNames.length, 100)];
  const gender = genders[random(genders.length, 50)];
  const bloodGroup = bloodGroups[random(bloodGroups.length, 75)];
  const maritalStatus = maritalStatuses[random(maritalStatuses.length, 125)];
  const city = cities[random(cities.length, 150)];
  const district = districts[random(districts.length, 175)];

  // Generate age between 18-80 based on seed
  const age = 18 + random(62, 200);
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthMonth = random(12, 250) + 1;
  const birthDay = random(28, 300) + 1;

  // Generate father's and mother's names
  const fatherFirstName = firstNames[random(firstNames.length, 400)];
  const fatherLastName = lastNames[random(lastNames.length, 450)];
  const motherFirstName = firstNames[random(firstNames.length, 500)];
  const motherLastName = lastNames[random(lastNames.length, 550)];

  // Generate address
  const houseNo = random(500, 600) + 1;
  const roadNo = random(50, 650) + 1;
  const area = ["Mirpur", "Gulshan", "Banani", "Dhanmondi", "Mohammadpur", "Uttara"][
    random(6, 700)
  ];

  // Generate phone number
  const phonePrefix = ["017", "018", "019", "016", "015", "013"][random(6, 800)];
  const phoneSuffix = String(random(10000000, 850)).padStart(8, "0");

  return {
    success: true,
    data: {
      nidNumber: nid,
      name: `${firstName} ${lastName}`,
      nameInBangla: `${firstName} ${lastName}`, // In real scenario, this would be in Bengali
      dob: `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(
        2,
        "0"
      )}`,
      gender: gender,
      bloodGroup: bloodGroup,
      maritalStatus: maritalStatus,
      fatherName: `${fatherFirstName} ${fatherLastName}`,
      motherName: `${motherFirstName} ${motherLastName}`,
      phone: `+880${phonePrefix}${phoneSuffix}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      addressLine1: `House ${houseNo}, Road ${roadNo}`,
      addressLine2: area,
      city: city,
      state: district,
      postalCode: String(1000 + random(9000, 900)),
      country: "BD",
      presentAddress: {
        division: district,
        district: city,
        upazila: area,
        postOffice: area,
        postCode: String(1000 + random(9000, 900)),
        address: `House ${houseNo}, Road ${roadNo}, ${area}`,
      },
      permanentAddress: {
        division: district,
        district: city,
        upazila: area,
        postOffice: area,
        postCode: String(1000 + random(9000, 950)),
        address: `House ${houseNo}, Road ${roadNo}, ${area}`,
      },
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nid}`,
      issueDate: `${currentYear - random(10, 1000)}-01-01`,
      expiryDate: `${currentYear + random(10, 1100)}-12-31`,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nid = searchParams.get("nid");

    if (!nid) {
      return NextResponse.json(
        {
          success: false,
          error: "NID number is required",
          message: "Please provide a valid NID number",
        },
        { status: 400 }
      );
    }

    // Validate NID format (10, 13, or 17 digits for Bangladesh)
    const nidRegex = /^\d{10}$|^\d{13}$|^\d{17}$/;
    if (!nidRegex.test(nid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid NID format",
          message: "NID must be 10, 13, or 17 digits",
        },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const personDetails = generateFakePersonDetails(nid);

    return NextResponse.json(personDetails, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("NID API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch NID details",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nid } = body;

    if (!nid) {
      return NextResponse.json(
        {
          success: false,
          error: "NID number is required",
          message: "Please provide a valid NID number in the request body",
        },
        { status: 400 }
      );
    }

    // Validate NID format
    const nidRegex = /^\d{10}$|^\d{13}$|^\d{17}$/;
    if (!nidRegex.test(nid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid NID format",
          message: "NID must be 10, 13, or 17 digits",
        },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const personDetails = generateFakePersonDetails(nid);

    return NextResponse.json(personDetails, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("NID API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch NID details",
      },
      { status: 500 }
    );
  }
}
