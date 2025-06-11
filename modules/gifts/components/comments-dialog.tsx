import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CommentsDialog({
  commentsDialogOpen,
  setCommentsDialogOpen,
}: {
  commentsDialogOpen: boolean;
  setCommentsDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={commentsDialogOpen} onOpenChange={setCommentsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comentários dos convidados</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
