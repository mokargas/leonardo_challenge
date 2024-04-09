
import { Metadata, NextPage } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Create or update your profile',
};

const Profile = dynamic(() => import('@/components/Profile/Profile'));

const ProfilePage: NextPage = () => {
  return <Profile />
};

export default ProfilePage;
