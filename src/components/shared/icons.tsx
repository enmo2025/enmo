import Image from 'next/image';
import LineIcon from '~/assets/icons/line.svg';

const Icons = {
  line: (size: number) => <Image src={LineIcon} alt="Line" width={size} height={size} />,
};

export default Icons;
