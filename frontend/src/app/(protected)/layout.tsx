"use client";
import ResponsiveDrawer from "@/components/navigation/menu/Drawer";
import Protected from "@/components/Protected";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <ResponsiveDrawer>{children}</ResponsiveDrawer>
    </Protected>
  );
}
