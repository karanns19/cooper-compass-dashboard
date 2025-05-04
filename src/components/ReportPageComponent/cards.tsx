import flightIcon from '../../assets/reportedPagesIcons/flight.png';
import luggageIcon from '../../assets/reportedPagesIcons/luggage.png';
import noLuggageIcon from '../../assets/reportedPagesIcons/no_luggage.png';
import travelIcon from '../../assets/reportedPagesIcons/travel.png';

export interface ReportPageCardProps {
    title: string;
    icon: string;
    count: number;
    lastUpdated: string;
}

const ReportCardNameList: ReportPageCardProps[] = [
    {
        title: 'Total Flights',
        icon: travelIcon,
        count: 1242,
        lastUpdated: '2 hours ago',
    },
    {
        title: 'Total Luggage',
        icon: luggageIcon,
        count: 1242,
        lastUpdated: '2 hours ago',
    },
    {
        title: 'No Luggage',
        icon: noLuggageIcon,
        count: 1242,
        lastUpdated: '2 hours ago',
    },
    {
        title: 'Travel History',
        icon: flightIcon,
        count: 1242,
        lastUpdated: '2 hours ago',
    },
];

export default function ReportPageCardComponent() {
    return (
        <div className="flex flex-row gap-4 pt-4 pb-4 justify-between items-center flex-wrap">
            {ReportCardNameList.map((item, index) => (
                <div key={index} className="h-[148px] w-[270px] p-6 bg-white shadow-md rounded-lg">
                    <div className="flex flex-1 items-center gap-4 px-2">
                        <div className="rounded-full bg-[#E5E5E5] h-[35px] w-[35px] p-2 flex justify-center items-center">
                            <img src={item.icon} alt={item.title} className="h-5 w-5" />
                        </div>
                        <p>{item.title}</p>
                    </div>
                    <div className="border-b-1 mt-2"></div>
                    <div className="flex flex-col gap-2 mt-2 px-2">
                        <h4>{item.count}</h4>
                        <p className="text-gray-500 text-sm">Updates {item.lastUpdated}</p>
                    </div>
                </div>
            ))}
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