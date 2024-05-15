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
        pipelineLength: pipelineNodes.length,
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

export const getPipelineNodeByOrderNo = async (pipelineId, userEmail) => {
  try {
    const res = await prisma.PipelineNode.findUnique({
      where: {
        pipelineId_userEmail: {
          pipelineId: pipelineId,
          userEmail: userEmail,
        },
      },
      select: {
        orderNo: true,
        user: true,
      },
    });

    return { success: true, data: res };
  } catch (err) {
    console.log(err);
    return { error: err?.message };
  }
};

export const getPipeLineWithNodeDetails = async (pipelineId) => {
  try {
    const res = await prisma.pipeline.findUnique({
      where: {
        id: pipelineId,
      },
      select: {
        title: true,
        PipelineNode: true,
      },
    });

    return { success: true, data: res };
  } catch (err) {
    console.log(err);
    return { error: err?.message };
  }
};

export const getPipelineLength = async (id) => {
  try {
    const res = await prisma.pipeline.findUnique({
      where: {
        id: id,
      },
      select: {
        pipelineLength: true,
      },
    });

    return { success: true, data: res.pipelineLength };
  } catch (err) {
    console.log(err);
    return { error: err?.message };
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

export const getPipelinesForUser = async (userId) => {
  try {
    const res = await prisma.pipeline.findMany({
      where: {
        PipelineNode: {
          some: {
            user: {
              is: {
                id: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        createdByUser: {
          select: {
            name: true,
            email: true,
          },
        },
        createdAt: true,
      },
    });

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};
