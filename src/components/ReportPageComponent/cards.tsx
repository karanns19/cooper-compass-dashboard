import { FaPlane } from 'react-icons/fa';
import { MdOutlineLuggage } from 'react-icons/md';
import { MdOutlineFlightTakeoff } from 'react-icons/md';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';

const reportCards = [
  {
    title: 'Total Flights',
    icon: <FaPlane className="text-green-500 bg-green-100 rounded-full p-1" size={28} />,
    value: '1,248',
    subtitle: 'Updates 2 hour ago',
  },
  {
    title: 'Baggage Handled',
    icon: <PiSuitcaseSimpleLight className="text-purple-500 bg-purple-100 rounded-full p-1" size={28} />,
    value: '65,320',
    subtitle: 'Updates 1 hour ago',
  },
  {
    title: 'Missed Baggage',
    icon: <MdOutlineLuggage className="text-blue-500 bg-blue-100 rounded-full p-1" size={28} />,
    value: '92',
    subtitle: 'Updates 1 hour ago',
  },
  {
    title: 'Delayed Flights',
    icon: <MdOutlineFlightTakeoff className="text-yellow-500 bg-yellow-100 rounded-full p-1" size={28} />,
    value: '20',
    subtitle: 'Updates 1 hour ago',
  },
];

export default function ReportPageCardComponent() {
  return (
    <div className="mb-4">
      <div className="flex flex-row gap-6 pb-2 justify-between items-center flex-wrap">
        {reportCards.map((item, index) => (
          <div key={index} className="flex-1 min-w-[250px] max-w-[320px] bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <span className="font-bold text-lg text-[#23223a]">{item.title}</span>
            </div>
            <div className="border-b border-gray-200 my-2"></div>
            <div className="text-2xl font-extrabold text-[#18181b] mb-1">{item.value}</div>
            <div className="text-sm text-gray-400 font-medium">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import flightIcon from '../../assets/reportedPagesIcons/flight.png';
// import luggageIcon from '../../assets/reportedPagesIcons/luggage.png';
// import noLuggageIcon from '../../assets/reportedPagesIcons/no_luggage.png';
// import travelIcon from '../../assets/reportedPagesIcons/travel.png';

// export interface ReportPageCardProps {
//     title: string;
//     icon: string;
//     count: number;
//     lastUpdated: string;
// }

// const ReportCardNameList: ReportPageCardProps[] = [{
//     title: 'Total Flights',
//     icon: travelIcon,
//     count: 1242,
//     lastUpdated: '2 hours ago',
// },
// {
//     title: 'Total Luggage',
//     icon: luggageIcon,
//     count: 1242,
//     lastUpdated: '2 hours ago',
// },
// {
//     title: 'No Luggage',
//     icon: noLuggageIcon,
//     count: 1242,
//     lastUpdated: '2 hours ago',
// },
// {
//     title: 'Travel History',
//     icon: flightIcon,
//     count: 1242,
//     lastUpdated: '2 hours ago',
// }]

// export default function ReportPageCardComponent() {

//     const ReportedCountCard = () => {
//         return ReportCardNameList.map((item, index) => (
//             <div key={index} className='h-[148px] w-[270px] p-6 bg-white shadow-md rounded-lg'>
//                 <div className='flex flex-1 items-center gap-4 px-2'>
//                     <div className='rounded-full bg-[#E5E5E5] h-[35px] w-[35px] p-2 flex justify-center items-center'>
//                         <img src={item.icon} alt="Flight" className='h-5 w-5' />
//                     </div>
//                     <p>{item.title}</p>
//                 </div>
//                 <div className='border-b-1 mt-2'></div>
//                 <div className='flex flex-col gap-2 mt-2 px-2'>
//                     <h4>{item.count}</h4>
//                     <p className='text-gray-500 text-sm'>Updates {item.lastUpdated}</p>
//                 </div>
//             </div>
//         ))
//     }
//     return (
//         <div className="flex flex-row gap-4 p-4">

//             {ReportCardNameList.map(ReportedCountCard)}

//         </div>
//     )
// }