import { MdQueryStats } from 'react-icons/md';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'Stats', path: '', icon: <MdQueryStats /> },
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <IoBarChartSharp /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'Profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
