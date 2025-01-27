import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Student {
  studentId: string;
  name: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: string | null;
  birthdata: Date | null;
}

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

export function StudentDetailsModal({ student, onClose }: StudentDetailsModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>Information about {student.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Name:</span>
            <span className="col-span-3">{student.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">First Name:</span>
            <span className="col-span-3">{student.firstName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Middle Name:</span>
            <span className="col-span-3">{student.middleName || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Last Name:</span>
            <span className="col-span-3">{student.lastName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Gender:</span>
            <span className="col-span-3">{student.gender || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Birthdate:</span>
            <span className="col-span-3">
              {student.birthdata ? new Date(student.birthdata).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
