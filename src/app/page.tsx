export default function Home() {
  return (
    <>
      <div
        className="w-[100vw] h-[12vh] z-10 fixed left-0 top-0 border-b-2 border-[#f5f5f5] border-dashed"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to right, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      />
      <div
        className="w-[45vw] min-h-[100vh]  mx-auto border-x-2 border-[#f5f5f5] border-dashed pt-[12vh]"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to bottom, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        <p>Hello World!</p>
        <p className="italic">Hello World!</p>
        <p className="font-[sentient]">Hello World!</p>
        <p className="font-[sentient] italic">Hello World!</p>
      </div>
    </>
  );
}
