"use server";

import prisma from "@/lib/prisma";

export const addPipeline = async (title, nodes, createdBy) => {
  if (!title || title.length === 0) throw Error("title cannot be empty");
  let pipelineNodes = nodes.map((item, idx) => {
    return { user: { connect: { email: item } }, orderNo: idx };
  });
  try {
    await prisma.pipeline.create({
      data: {
        title: title,
        createdByUser: {
          connect: {
            id: createdBy,
          },
        },
        PipelineNode: {
          create: pipelineNodes,
        },
      },
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const getPipelines = async () => {
  try {
    const res = await prisma.pipeline.findMany({
      select: {
        id: true,
        title: true,
        PipelineNode: {
          select: {
            userEmail: true,
            orderNo: true,
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