
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // This layout can be used for shared UI around login, signup, forgot password, etc.
  // For now, it just renders the children.
  return <>{children}</>;
}
