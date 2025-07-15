'use client';

import React from 'react';
import UpdateProfile from '~/components/shared/update-profile';
import { Card, CardContent } from '~/components/ui/card';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface EditProfileProps {
  user: User;
}

export default function EditProfile({ user }: EditProfileProps) {
  const router = useRouter();
  return (
    <Card>
      <CardContent>
        <UpdateProfile
          hasCancelButton
          user={user}
          successCallback={() => {
            router.push('/profile/info');
          }}
        />
      </CardContent>
    </Card>
  );
}
