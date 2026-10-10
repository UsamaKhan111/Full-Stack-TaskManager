import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      number: "01",
      title: "Create tasks",
      description:
        "Add tasks with a title and description so you know what needs to be done.",
    },
    {
      number: "02",
      title: "Update details",
      description:
        "Change task information whenever your plans or priorities change.",
    },
    {
      number: "03",
      title: "Track progress",
      description:
        "Mark tasks as complete and keep track of what's still pending.",
    },
    {
      number: "04",
      title: "Stay organized",
      description:
        "Edit or remove tasks as your workload changes.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-gray-500">
            A simple task manager
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Keep your tasks
            <br className="hidden sm:block" /> in one place.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            Create tasks, update details, and track your progress without
            making things more complicated than they need to be.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tasks"
              className="rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              View tasks
            </Link>

            <Link
              to="/tasks/new"
              className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Create a task
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What you can do
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                The essentials for managing your everyday tasks.
              </p>
            </div>

            <Link
              to="/tasks"
              className="w-fit text-sm font-medium text-gray-700 underline underline-offset-4 transition hover:text-gray-950"
            >
              Go to your tasks
            </Link>
          </div>

          <div className="mt-9 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="border-t border-gray-200 py-6"
              >
                <p className="text-xs font-medium text-gray-400">
                  {feature.number}
                </p>

                <h3 className="mt-4 text-base font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-semibold">Ready to get started?</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add a task and keep moving.
            </p>
          </div>

          <Link
            to="/tasks/new"
            className="w-fit rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            New task
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
