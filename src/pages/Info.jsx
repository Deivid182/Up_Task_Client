import Header from "../components/Header";

export default function Info() {
  return (
    <>
      <Header thereIsMenu={true} />

      <main className="container mx-auto mt-2 md:mt-10  md:flex md:justify-center">
        <div className="md:w-11/12 lg:w-5/6">Info</div>
      </main>
    </>
  );
}
