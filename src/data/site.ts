export const contact = {
  phone: '+385 21 542 106',
  phoneShort: '021 542 106',
  phoneHref: 'tel:+38521542106',
  email: 'ekp@ekp.hr',
  address: 'Smiljanićeva 2, 21000 Split',
  hours: 'pon–pet 8–15 h i po dogovoru',
  company: 'Elektro Klima Projekt d.o.o.',
};

export type Area = 'l1' | 'n' | 'l2' | 'l3';

export const services: {
  code: string;
  area: Area;
  label: string;
  href: string;
  links: { label: string; href: string }[];
}[] = [
  {
    code: 'L1', area: 'l1', label: 'Zgrade', href: '/zgrade',
    links: [
      { label: 'Elektroinstalacije', href: '/zgrade' },
      { label: 'Fotonaponski sustavi', href: '/zgrade/fotonapon' },
      { label: 'Vatrodojava', href: '/zgrade/vatrodojava' },
      { label: 'Pametne kuće', href: '/zgrade/pametne-kuce' },
    ],
  },
  {
    code: 'N', area: 'n', label: 'Obnovljivi izvori', href: '/obnovljivi-izvori',
    links: [
      { label: 'Za vaš dom', href: '/obnovljivi-izvori/za-dom' },
      { label: 'Za tvrtke i javne zgrade', href: '/obnovljivi-izvori/za-tvrtke' },
    ],
  },
  {
    code: 'L2', area: 'l2', label: 'Industrija', href: '/industrija',
    links: [
      { label: 'Pametne tvornice', href: '/industrija' },
      { label: 'E-plan i BIM', href: '/industrija#softver' },
    ],
  },
  {
    code: 'L3', area: 'l3', label: 'Promet', href: '/promet',
    links: [{ label: 'Cestovna infrastruktura', href: '/promet' }],
  },
];
