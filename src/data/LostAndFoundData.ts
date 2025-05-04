import image1 from "../assets/LostAndFoundImages/item1.png"
import image2 from "../assets/LostAndFoundImages/item2.png"
import image3 from "../assets/LostAndFoundImages/item3.png"
import image4 from "../assets/LostAndFoundImages/item4.png"
import image5 from "../assets/LostAndFoundImages/item5.png"
import image6 from "../assets/LostAndFoundImages/item6.png"


export type LostItem = {
    id: string;
    image: string;
    name: string;
    flightNumber: string;
    status: "Reported" | "Found" | "Unclaimed" | "Returned";
    lastLocation: string;
    description: string;
    baggageTag: string;
    referenceId: string;
    reportedDate: string;
  };
  
  export const lostAndFoundData: LostItem[] = [
    {
      id: "1",
      image: image1,
      name: "Red Backpack",
      flightNumber: "AA 100",
      status: "Reported",
      lastLocation: "Gate 14",
      description: "Red backpack with black stripes",
      baggageTag: "B123456",
      referenceId: "LF-2025-0048",
      reportedDate: "20 Apr 2025, 7:30 PM",
    },
    {
      id: "2",
      image: image2,
      name: "Leather Bag",
      flightNumber: "DL 200",
      status: "Reported",
      lastLocation: "Lounge B",
      description: "Brown leather bag",
      baggageTag: "B234567",
      referenceId: "LF-2025-0049",
      reportedDate: "20 Apr 2025, 8:00 PM",
    },
    {
      id: "3",
      image: image3,
      name: "Travel Bag",
      flightNumber: "UA 416",
      status: "Unclaimed",
      lastLocation: "Dubai Terminal 3",
      description: "Blue travel bag",
      baggageTag: "B345678",
      referenceId: "LF-2025-0050",
      reportedDate: "21 Apr 2025, 9:15 AM",
    },
    {
      id: "4",
      image: image4,
      name: "Red Backpack",
      flightNumber: "AA 100",
      status: "Reported",
      lastLocation: "Gate 14",
      description: "Red backpack with black stripes",
      baggageTag: "B123456",
      referenceId: "LF-2025-0048",
      reportedDate: "20 Apr 2025, 7:30 PM",
    },
    {
      id: "5",
      image: image5,
      name: "Leather Bag",
      flightNumber: "DL 200",
      status: "Found",
      lastLocation: "Lounge B",
      description: "Brown leather bag",
      baggageTag: "B234567",
      referenceId: "LF-2025-0049",
      reportedDate: "20 Apr 2025, 8:00 PM",
    },
    {
      id: "6",
      image: image6,
      name: "Travel Bag",
      flightNumber: "UA 416",
      status: "Returned",
      lastLocation: "Dubai Terminal 3",
      description: "Blue travel bag",
      baggageTag: "B345678",
      referenceId: "LF-2025-0050",
      reportedDate: "21 Apr 2025, 9:15 AM",
    },
   
  ];
  