'use client';

import type { ComponentProps } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import Link from 'next/link';

export type ContactLocation =
  | 'header_desktop'
  | 'header_mobile'
  | 'footer'
  | 'home'
  | 'about'
  | 'roadmap'
  | 'column_archive'
  | 'column_detail';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  location: ContactLocation;
};

export function TrackedContactLink({ location, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      href="/contact"
      onClick={(event) => {
        sendGTMEvent({
          event: 'contact_cta_click',
          contact_location: location,
          link_url: '/contact',
        });
        onClick?.(event);
      }}
    />
  );
}
