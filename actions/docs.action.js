"use server";

import prisma from "@/lib/prisma";

export const addDocument = async (title, location, pipelineId, uploaderId) => {
  if (title.length === 0 || location.length === 0 || pipelineId.length === 0)
    return { error: "title or location or pipeline cannot be empty" };
  try {
    await prisma.document.create({
      data: {
        title: title,
        location: location,
        status: "IN PROGRESS",
        stage: 0,
        uploader: {
          connect: {
            id: uploaderId,
          },
        },
        pipeline: {
          connect: {
            id: pipelineId,
          },
        },
      },
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const getDocumentsCreatedByUser = async (
  userId,
  status = "IN PROGRESS",
) => {
  try {
    const res = await prisma.document.findMany({
      where: {
        uploaderId: userId,
        status: status,
      },
    });

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const getDocumentsFromPipeline = async (pipelineId) => {
  try {
    const res = await prisma.document.findMany({
      where: {
        pipeline: {
          is: {
            id: pipelineId,
          },
        },
      },
    });

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};
