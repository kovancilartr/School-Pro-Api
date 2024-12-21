import { db } from "@/db/prisma";

export async function deleteCourse(req: any, res: any) {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteSection(req: any, res: any) {
  try {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    await db.section.delete({
      where: {
        id: sectionId,
      },
    });

    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteChapter(req: any, res: any) {
  try {
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCategory(req: any, res: any) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteAttachment(req: any, res: any) {
  try {
    const { attachmentId } = req.params;

    if (!attachmentId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const attachment = await db.attachment.findUnique({
      where: {
        id: attachmentId,
      },
    });

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    await db.attachment.delete({
      where: {
        id: attachmentId,
      },
    });

    return res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletePurchase(req: any, res: any) {
  try {
    const { purchaseId } = req.params;

    if (!purchaseId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        id: purchaseId,
      },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await db.purchase.delete({
      where: {
        id: purchaseId,
      },
    });

    return res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
