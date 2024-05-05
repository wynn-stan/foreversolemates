import { InstagramIcon, LinkedinIcon, TwitterIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

export default function Links() {
  //variables
  const guides = [
    {
      header: 'Customer Care',
      links: [
        { text: 'Login/Register', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Return Policy', href: '#' },
        { text: 'Terms & Conditions', href: '#' },
      ],
    },
  ];

  //variables - socials
  const socials = [
    {
      Icon: InstagramIcon,
      href: '#',
    },
    {
      Icon: LinkedinIcon,
      href: '#',
    },
    {
      Icon: TwitterIcon,
      href: '#',
    },
  ];

  return (
    <div className="flex gap-4">
      {guides.map((item, key) => (
        <div key={key} className="space-y-3">
          <div className="font-medium">{item.header}</div>
          <div>
            {item.links.map((link, key) => (
              <div key={key} className="text-sm">
                <Link href={link.href}>{link.text}</Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <div className="space-y-3">
        <div className="font-medium">Follow us</div>

        <div className="flex gap-4">
          {socials.map((Item, key) => (
            <Link key={key} href={Item.href}>
              <Item.Icon className="text-gray-30" size={20} />
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
}
