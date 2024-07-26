import {
  Clock3Icon,
  MailIcon,
  MessageCircleMoreIcon,
  PhoneIcon,
} from 'lucide-react';

export default function Info() {
  //variables
  const items = [
    {
      Icon: Clock3Icon,
      header: 'Service Hours',
      desc: ['Monday - Friday 10am - 5pm (GMT)', 'Sat 10am - 4pm (GMT)'],
    },
    {
      Icon: PhoneIcon,
      header: 'Phone',
      desc: ['(+233) 025 766 7118'],
    },
    {
      Icon: MessageCircleMoreIcon,
      header: 'WhatsApp',
      desc: ['(+233) 025 766 7118'],
    },
    {
      Icon: MailIcon,
      header: 'Email',
      desc: ['info@foreversolemates.com'],
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-between text-sm">
      {items.map((item, key) => {
        const Icon = item.Icon;
        return (
          <div key={key} className="flex gap-4 items-start">
            <Icon className="text-gray-20" />
            <div>
              <div className="font-medium">{item.header}</div>
              {item.desc.map((desc, key) => (
                <div key={key} className="text-gray-50">
                  {desc}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
