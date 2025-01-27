
import Classes from "@/components/class/class";
import { getAllClass } from "@/db/query/getClass";

export default async function Page() {
    const classes = await getAllClass();
    return <Classes initialClasses={classes ?? []}/>
}