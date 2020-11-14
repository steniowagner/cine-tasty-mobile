import { DefaultTheme } from 'styled-components';

export type SupportedIcons =
  | 'settings'
  | 'china'
  | 'finland'
  | 'france'
  | 'germany'
  | 'israel'
  | 'italy'
  | 'nederlands'
  | 'norway'
  | 'portugal'
  | 'russia'
  | 'saudi-arabia'
  | 'spain'
  | 'uk';

type Props = {
  theme: DefaultTheme;
  id: SupportedIcons;
  color?: string;
};

const getIconSVG = ({ theme, id }: Props): string => {
  const XMLIconsMapping: Record<SupportedIcons, string> = {
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.30718 1.5C8.11968 1.5 7.93293 1.50675 7.74843 1.52025C7.52568 1.53675 7.28943 1.731 7.24067 2.06775L7.16943 2.5575C7.04718 3.4005 6.46893 4.02675 5.82618 4.37175C5.72943 4.4235 5.63493 4.479 5.54193 4.536C4.92093 4.92225 4.08918 5.10975 3.29793 4.794L2.83743 4.61025C2.52093 4.48425 2.23518 4.59075 2.10843 4.776C1.89918 5.08275 1.71168 5.406 1.54893 5.74425C1.45143 5.94525 1.50168 6.24525 1.76868 6.456L2.16093 6.76575C2.82843 7.29225 3.08268 8.1045 3.05943 8.83425L3.05718 9L3.05943 9.16575C3.08268 9.8955 2.82843 10.7078 2.16093 11.2343L1.76868 11.544C1.50168 11.7547 1.45143 12.0547 1.54893 12.2557C1.71168 12.594 1.89918 12.9172 2.10843 13.224C2.23518 13.4093 2.52093 13.5157 2.83743 13.3897L3.29793 13.206C4.08918 12.8903 4.92093 13.0785 5.54193 13.464C5.63493 13.521 5.72943 13.5765 5.82618 13.6283C6.46893 13.9733 7.04718 14.5995 7.16943 15.4425L7.24067 15.9323C7.28943 16.269 7.52568 16.4632 7.74843 16.4797C7.93293 16.4932 8.11968 16.5 8.30718 16.5C8.49468 16.5 8.68143 16.4932 8.86593 16.4797C9.08943 16.4632 9.32493 16.269 9.37368 15.9323L9.44493 15.4425C9.56718 14.5995 10.1454 13.9733 10.7882 13.6283C10.8849 13.5765 10.9794 13.521 11.0732 13.464C11.6934 13.0785 12.5252 12.8903 13.3164 13.206L13.7769 13.3897C14.0934 13.5157 14.3792 13.4093 14.5059 13.224C14.7152 12.9172 14.9027 12.5932 15.0654 12.2557C15.1629 12.0547 15.1127 11.7547 14.8457 11.544L14.4534 11.2343C13.7859 10.7078 13.5317 9.8955 13.5549 9.16575L13.5572 9L13.5549 8.83425C13.5317 8.1045 13.7859 7.29225 14.4534 6.76575L14.8457 6.456C15.1127 6.24525 15.1629 5.94525 15.0654 5.74425C14.9027 5.40675 14.7152 5.08275 14.5059 4.776C14.3792 4.59075 14.0934 4.48425 13.7769 4.61025L13.3164 4.794C12.5252 5.10975 11.6934 4.92225 11.0732 4.536C10.9794 4.479 10.8849 4.4235 10.7882 4.37175C10.1454 4.02675 9.56718 3.4005 9.44493 2.5575L9.37368 2.06775C9.32493 1.731 9.08943 1.53675 8.86593 1.52025C8.68143 1.50675 8.49468 1.5 8.30718 1.5ZM7.63893 0.02475C7.85943 0.00825 8.08218 0 8.30718 0C8.53218 0 8.75493 0.00825 8.97543 0.02475C10.0142 0.1005 10.7252 0.9375 10.8579 1.8525L10.9292 2.34225C10.9667 2.60025 11.1602 2.86875 11.4977 3.05025C11.6222 3.117 11.7444 3.1875 11.8637 3.2625C12.1892 3.46425 12.5184 3.49725 12.7607 3.4005L13.2219 3.21675C14.0792 2.87475 15.1577 3.072 15.7442 3.93C15.9954 4.29825 16.2212 4.68675 16.4169 5.09175C16.8692 6.02925 16.4994 7.06275 15.7742 7.63425L15.3827 7.94325C15.1779 8.1045 15.0422 8.406 15.0542 8.78775C15.0564 8.85825 15.0572 8.92875 15.0572 9C15.0572 9.07125 15.0564 9.14175 15.0542 9.21225C15.0422 9.594 15.1779 9.8955 15.3827 10.0568L15.7742 10.3658C16.4994 10.9373 16.8692 11.9707 16.4169 12.9082C16.2212 13.3132 15.9954 13.7017 15.7442 14.07C15.1577 14.928 14.0792 15.1252 13.2219 14.7832L12.7607 14.5995C12.5184 14.5027 12.1892 14.5358 11.8637 14.7375C11.7444 14.8125 11.6222 14.883 11.4977 14.9497C11.1602 15.1313 10.9667 15.3997 10.9292 15.6578L10.8579 16.1475C10.7252 17.0625 10.0142 17.8995 8.97543 17.9753C8.75493 17.9918 8.53218 18 8.30718 18C8.08218 18 7.85943 17.9918 7.63893 17.9753C6.60093 17.8995 5.88918 17.0625 5.75643 16.1475L5.68518 15.6578C5.64768 15.3997 5.45418 15.1313 5.11668 14.9497C4.99218 14.883 4.86993 14.8125 4.75068 14.7375C4.42518 14.5358 4.09593 14.5027 3.85368 14.5995L3.39243 14.7832C2.53518 15.1252 1.45668 14.928 0.870175 14.07C0.618925 13.7017 0.393175 13.3132 0.198175 12.9082C-0.254825 11.9707 0.114925 10.9373 0.840175 10.3658L1.23168 10.0568C1.43643 9.8955 1.57218 9.594 1.56018 9.21225C1.55793 9.14175 1.55718 9.07125 1.55718 9C1.55718 8.92875 1.55793 8.85825 1.56018 8.78775C1.57218 8.406 1.43643 8.1045 1.23168 7.94325L0.840175 7.63425C0.114925 7.06275 -0.254825 6.02925 0.198175 5.09175C0.393175 4.68675 0.618925 4.29825 0.870175 3.93C1.45668 3.072 2.53518 2.87475 3.39243 3.21675L3.85368 3.4005C4.09593 3.49725 4.42518 3.46425 4.75068 3.2625C4.86993 3.1875 4.99218 3.117 5.11668 3.05025C5.45418 2.86875 5.64768 2.60025 5.68518 2.34225L5.75643 1.8525C5.88918 0.9375 6.60093 0.1005 7.63893 0.02475ZM8.30718 6.75C7.06443 6.75 6.05718 7.75725 6.05718 9C6.05718 10.2428 7.06443 11.25 8.30718 11.25C9.54993 11.25 10.5572 10.2428 10.5572 9C10.5572 7.75725 9.54993 6.75 8.30718 6.75ZM4.55718 9C4.55718 6.92925 6.23568 5.25 8.30718 5.25C10.3779 5.25 12.0572 6.92925 12.0572 9C12.0572 11.0708 10.3779 12.75 8.30718 12.75C6.23568 12.75 4.55718 11.0708 4.55718 9Z" fill="${theme.colors.text}"/></svg>`,
    china:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#d80027"/><path fill="#ffda44" d="M140.1 155.8l22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118zm163.4 240.7l-16.9-20.8-25 9.7 14.5-22.5-16.9-20.9 25.9 6.9 14.6-22.5 1.4 26.8 26 6.9-25.1 9.6zm33.6-61l8-25.6-21.9-15.5 26.8-.4 7.9-25.6 8.7 25.4 26.8-.3-21.5 16 8.6 25.4-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7-26.5-3.8-11.8 24-4.6-26.4-26.6-3.8 23.8-12.5-4.6-26.5 19.2 18.7zm-78.2-73l-2 26.7 24.9 10.1-26.1 6.4-1.9 26.8-14.1-22.8-26.1 6.4 17.3-20.5-14.2-22.7 24.9 10.1z"/></svg>',
    finland:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#0052b4" d="M509.8 222.6H200.3V6.1a254.3 254.3 0 0 0-66.7 25v191.5H2.2a258.2 258.2 0 0 0 0 66.8h131.4v191.5a254.3 254.3 0 0 0 66.7 25V289.4h309.5a258.6 258.6 0 0 0 0-66.8z"/></svg>',
    france:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"/><path fill="#0052b4" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"/></svg>',
    germany:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffda44" d="M16 345a256 256 0 0 0 480 0l-240-22.2L16 345z"/><path fill="#333" d="M256 0A256 256 0 0 0 16 167l240 22.2L496 167A256 256 0 0 0 256 0z"/><path fill="#d80027" d="M16 167a255.5 255.5 0 0 0 0 178h480a255.4 255.4 0 0 0 0-178H16z"/></svg>',
    israel:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#0052b4" d="M352.4 200.3H288l-32-55.6-32.1 55.6h-64.3l32.1 55.7-32 55.7h64.2l32.1 55.6 32.1-55.6h64.3L320.3 256l32-55.7zm-57 55.7l-19.7 34.2h-39.4L216.5 256l19.8-34.2h39.4l19.8 34.2zM256 187.6l7.3 12.7h-14.6l7.3-12.7zm-59.2 34.2h14.7l-7.4 12.7-7.3-12.7zm0 68.4l7.3-12.7 7.4 12.7h-14.7zm59.2 34.2l-7.3-12.7h14.6l-7.3 12.7zm59.2-34.2h-14.7l7.4-12.7 7.3 12.7zm-14.7-68.4h14.7l-7.3 12.7-7.4-12.7zM415.4 55.7H96.6a257.3 257.3 0 0 0-59 66.7h436.8a257.3 257.3 0 0 0-59-66.7zM96.6 456.3h318.8a257.3 257.3 0 0 0 59-66.7H37.6a257.3 257.3 0 0 0 59 66.7z"/></svg>',
    italy:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"/><path fill="#6da544" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"/></svg>',
    nederlands:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#a2001d" d="M256 0A256 256 0 0 0 16 167h480A256 256 0 0 0 256 0z"/><path fill="#0052b4" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"/></svg>',
    norway:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#d80027" d="M8.8 322.8A256.2 256.2 0 0 0 100.2 459V322.8H8.8zm225 188.2a259.3 259.3 0 0 0 22.2 1 256 256 0 0 0 247.2-189.2H233.7V511zm269.4-321.8A256 256 0 0 0 233.7 1v188.2h269.5zM100.2 53A256.2 256.2 0 0 0 8.8 189.2h91.4V53z"/><path fill="#0052b4" d="M509.8 222.6H200.3V6.1a254.3 254.3 0 0 0-66.7 25v191.5H2.2a258.2 258.2 0 0 0 0 66.8h131.4v191.5a254.3 254.3 0 0 0 66.7 25V289.4h309.5a258.6 258.6 0 0 0 0-66.8z"/></svg>',
    portugal:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#6da544" d="M0 256a256 256 0 0 0 167 240l22.2-240L167 16A256 256 0 0 0 0 256z"/><path fill="#d80027" d="M512 256A256 256 0 0 0 167 16v480a256 256 0 0 0 345-240z"/><circle cx="167" cy="256" r="89" fill="#ffda44"/><path fill="#d80027" d="M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z"/><path fill="#eee" d="M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"/></svg>',
    russia:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#0052b4" d="M496 345a255.4 255.4 0 0 0 0-178H16a255.5 255.5 0 0 0 0 178l240 22.3L496 345z"/><path fill="#d80027" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"/></svg>',
    'saudi-arabia':
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#496e2d"/><g fill="#eee"><path d="M144.7 306c0 18.5 15 33.5 33.4 33.5h100.2a27.8 27.8 0 0 0 27.8 27.8h33.4a27.8 27.8 0 0 0 27.8-27.8V306H144.7zm225.4-161.3v78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9H370zm-239.3 78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9h-33.4v78z"/><path d="M320 144.7h33.4v78H320zm-50 44.5a5.6 5.6 0 0 1-11.2 0v-44.5h-33.4v44.5a5.6 5.6 0 0 1-11.1 0v-44.5h-33.4v44.5a39 39 0 0 0 39 39 38.7 38.7 0 0 0 22.2-7 38.7 38.7 0 0 0 22.2 7c1.7 0 3.4-.1 5-.3a22.3 22.3 0 0 1-21.6 17v33.4c30.6 0 55.6-25 55.6-55.7v-77.9H270v44.5z"/><path d="M180.9 244.9h50v33.4h-50z"/></g></svg>',
    spain:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffda44" d="M0 256c0 31.3 5.6 61.3 16 89l240 22.3L496 345a255.5 255.5 0 0 0 0-178l-240-22.3L16 167a255.5 255.5 0 0 0-16 89z"/><path fill="#d80027" d="M496 167a256 256 0 0 0-480 0h480zM16 345a256 256 0 0 0 480 0H16z"/></svg>',
    uk:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#0052b4" d="M53 100.1a255 255 0 0 0-44.2 89.1H142l-89-89zm450.2 89.1a255 255 0 0 0-44.1-89l-89 89h133zM8.8 322.8a255 255 0 0 0 44.1 89l89-89H9zm403-269.9a255 255 0 0 0-89-44V142l89-89zM100.2 459.1a255 255 0 0 0 89.1 44V370l-89 89zm89-450.3a255 255 0 0 0-89 44.1l89 89.1V8.8zm133.6 494.4a255 255 0 0 0 89-44.1l-89-89v133zM370 322.8l89 89a255 255 0 0 0 44.2-89H370z"/><g fill="#d80027"><path d="M509.8 222.6H289.4V2.2A258.6 258.6 0 0 0 256 0c-11.3 0-22.5.7-33.4 2.2v220.4H2.2A258.6 258.6 0 0 0 0 256c0 11.3.7 22.5 2.2 33.4h220.4v220.4a258.4 258.4 0 0 0 66.8 0V289.4h220.4A258.5 258.5 0 0 0 512 256c0-11.3-.7-22.5-2.2-33.4z"/><path d="M322.8 322.8L437 437a256.6 256.6 0 0 0 15-16.4l-97.7-97.8h-31.5zm-133.6 0L75 437a256.6 256.6 0 0 0 16.4 15l97.8-97.7v-31.5zm0-133.6L75 75a256.6 256.6 0 0 0-15 16.4l97.7 97.8h31.5zm133.6 0L437 75a256.3 256.3 0 0 0-16.4-15l-97.8 97.7v31.5z"/></g></svg>',
  };

  return XMLIconsMapping[id];
};

export default getIconSVG;
