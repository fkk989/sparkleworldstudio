export default function Projects({ params }: { params: { id: string } }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-[20px]">{params.id}</h1>
    </div>
  );
}
