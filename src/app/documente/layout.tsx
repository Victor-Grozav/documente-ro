import DisclaimerModal from "@/components/DisclaimerModal";

export default function DocumenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DisclaimerModal />
      {children}
    </>
  );
}
