import { useState } from 'react';
import { FaSuitcaseRolling, FaUserCircle, FaCog, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const helpCards = [
  {
    label: 'Baggage Handling Support',
    desc: 'Guidance on baggage check-in, transfer, and retrieval processes.',
    icon: <FaSuitcaseRolling size={32} className="text-[#7c3aed]" />,
    bg: 'bg-[#f6f3ff]',
    border: 'border-[#7c3aed]'
  },
  {
    label: 'Profile Assistance',
    desc: 'Manage your account details, and access permissions.',
    icon: <FaUserCircle size={32} className="text-[#a78bfa]" />,
    bg: 'bg-[#f3f4f6]',
    border: 'border-[#a78bfa]'
  },
  {
    label: 'Technical Support',
    desc: 'Assistance with system errors, software issues, and dashboard.',
    icon: <FaCog size={32} className="text-[#fbbf24]" />,
    bg: 'bg-[#fef9c3]',
    border: 'border-[#fbbf24]'
  },
  {
    label: 'Reporting Issue',
    desc: 'Find answers to common questions and get quick help.',
    icon: <FaExclamationCircle size={32} className="text-[#f59e42]" />,
    bg: 'bg-[#fff7ed]',
    border: 'border-[#f59e42]'
  }
];

const faqs = [
  {
    q: "How can I track a passenger's baggage in real-time?",
    a: "You can track baggage in real-time using the Track Baggage module. Enter the PNR or baggage tag to view live status updates."
  },
  {
    q: 'What should I do if a baggage is marked as "Missing"?',
    a: 'If baggage is marked as missing, immediately notify the Lost & Found team and update the status in the system.'
  },
  {
    q: 'Can I update baggage transfer status between connecting flights?',
    a: 'Yes, you can update the transfer status from the Transfer Hub section for each connecting flight.'
  },
  {
    q: 'How are notifications triggered for missing or delayed baggage?',
    a: 'Notifications are automatically triggered based on baggage status changes and delays in the system.'
  },
  {
    q: 'Where can I view my assigned tasks or daily summary?',
    a: 'Assigned tasks and daily summaries are available on your dashboard and in the Reports section.'
  }
];

const others = [
  { label: 'Contact Support', modalTitle: 'Contact Support', modalContent: 'You can contact support at support@airport.com or call 1800-123-456.' },
  { label: 'Rise a Ticket', modalTitle: 'Raise a Ticket', modalContent: 'To raise a ticket, please fill out the ticket form in the Support section.' },
  { label: 'Need Assistance?', modalTitle: 'Need Assistance?', modalContent: 'For any assistance, reach out to our helpdesk or use the chat support.' },
];

function Modal({ 
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div className="text-lg font-semibold mb-4">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function Help() {
  const [selected, setSelected] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  // Tab modal content
  const tabModals = [
    {
      title: 'Baggage Handling Support',
      content: 'For baggage check-in, transfer, and retrieval, please refer to the Baggage Handling module or contact the support team.'
    },
    {
      title: 'Profile Assistance',
      content: 'Manage your account details and permissions in the Profile section.'
    },
    {
      title: 'Technical Support',
      content: 'For technical issues, system errors, or dashboard help, contact IT support or refer to the documentation.'
    },
    {
      title: 'Reporting Issue',
      content: 'To report an issue, use the reporting form or contact the helpdesk.'
    }
  ];

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-6">
      <div className="mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
            <FaQuestionCircle className="text-2xl text-[#23223a]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#23223a]">Help Center</h1>
            <p className="text-gray-500 text-sm">Manage lost and found things</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 mt-4">
          {helpCards.map((card, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setModal({ open: true, title: tabModals[i].title, content: tabModals[i].content });
              }}
              className={`rounded-2xl flex flex-col items-center justify-center p-6 min-h-[140px] transition-all duration-200 ${card.bg} ${selected===i ? 'shadow-lg' : 'border-2 border-transparent shadow'}`}
              style={{}}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 border ${card.border}`}>{card.icon}</div>
              <div className="font-bold text-base text-[#23223a] mb-1 text-center">{card.label}</div>
              <div className="text-center text-sm text-gray-500">{card.desc}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="font-bold text-lg text-[#23223a] mb-6">General FAQs</div>
          <div className="flex flex-col gap-2 mb-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b last:border-b-0 border-[#f3f4f6]">
                <button
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-[#23223a]">{faq.q}</span>
                  <span className="text-xl text-gray-400">
                    {openFaq === i ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-4 pl-1 text-gray-600 text-sm animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="font-bold text-base text-[#23223a] mb-2 mt-8">Others</div>
          <div className="flex flex-col gap-1">
            {others.map((item, i) => (
              <button
                key={i}
                onClick={() => setModal({ open: true, title: item.modalTitle, content: item.modalContent })}
                className="text-left text-[#23223a] py-1 px-1 rounded transition hover:bg-gray-100 focus:outline-none"
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal open={modal.open} onClose={() => setModal({ ...modal, open: false })} title={modal.title}>
        <div className="text-gray-700 text-base">{modal.content}</div>
      </Modal>
    </div>
  );
}