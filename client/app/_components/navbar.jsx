import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href='/'>Dashboard</Link>
      <Link href='/'>Home</Link>
      <Link href='/'>Account</Link>
    </nav>
  );
}
