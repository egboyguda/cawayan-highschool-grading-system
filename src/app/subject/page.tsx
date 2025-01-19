import Classes from "@/components/classes/class";
import { getAllSubjects } from "@/db/query/getSubject";

export default async function ClassesPage() {
  const subjects = (await getAllSubjects()) ?? []
  return <Classes initialClasses={subjects} />
}

