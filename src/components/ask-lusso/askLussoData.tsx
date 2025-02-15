import ExampleIcon from "../../assets/images/icons/example-icon.svg";
import LimitationsIcon from "../../assets/images/icons/limitations.svg";
import CapabilitiesIcon from "../../assets/images/icons/capabilities.svg";

interface ListType {
  id: number;
  desc: string;
}
interface HelpDataType {
  id: number;
  title: string;
  icon: any;
  list: ListType[];
}
const helpData: HelpDataType[] = [
  {
    id: 1,
    title: "Example",
    icon: ExampleIcon,
    list: [
      { id: 1.1, desc: '"Tell me about the history of the Taj Mahal"' },
      {
        id: 1.2,
        desc: '"Calculate the derivative of the function y = 3x^2 +2x - 1"',
      },
      { id: 1.3, desc: '"What news happened in the world today?"' },
    ],
  },
  {
    id: 2,
    title: "Capabilities",
    icon: LimitationsIcon,
    list: [
      { id: 2.1, desc: "Support user-provided follow-up corrections" },
      { id: 2.2, desc: "Programmed to reject  inappropriate solicitations" },
      {
        id: 2.3,
        desc: "Retains previous user inputs during the ongoing conversation",
      },
    ],
  },
  {
    id: 3,
    title: "Limitations",
    icon: CapabilitiesIcon,
    list: [
      { id: 3.1, desc: "Support user-provided follow-up corrections" },
      { id: 3.2, desc: "Might create harmful or biased content at times" },
      { id: 3.3, desc: "Limited awarenes of post-2021 world events" },
    ],
  },
];

export { helpData };
