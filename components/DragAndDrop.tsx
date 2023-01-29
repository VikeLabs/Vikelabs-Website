import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Tag, useDisclosure, Wrap } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LinkTag, TechTag } from "../types";
import { colorShade, hexToRgbA } from "../utils/colorHelpers";
import TechTagCustomizer from "./TechTagCustomizer";

const DragAndDrop = ({
  pt,
  direction,
  type,
  items,
  onDragEnd,
  onRemoveItem,
}: {
  pt: number;
  direction: string;
  type: "stack" | "links";
  items: TechTag[] | LinkTag[];
  onDragEnd: (result: any) => void;
  onRemoveItem: (index: number) => void;
}) => {
  const DragContent = () => {
    switch (type) {
      case "stack":
        return (
          <>
            {(!!items.length ? (items as TechTag[]) : []).map((tech: TechTag, index: number) => (
              <Draggable key={index} draggableId={String(index)} index={index}>
                {(provided) => (
                  <HStack
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={index}
                    spacing={1}
                  >
                    <Tag
                      size="sm"
                      variant="solid"
                      borderRadius="sm"
                      colorScheme={tech.color.includes("#") ? undefined : tech.color}
                      bgColor={tech.color.includes("#") ? tech.color : undefined}
                      cursor="pointer"
                      height="auto"
                    >
                      {tech.label}
                    </Tag>
                    <IconButton
                      ml="1"
                      size="1xs"
                      aria-label="delete tech tag"
                      icon={<DeleteIcon />}
                      onClick={() => onRemoveItem(index)}
                      variant="ghost"
                    />
                  </HStack>
                )}
              </Draggable>
            ))}
          </>
        );
      case "links":
        return (
          <>
            {(!!items.length ? (items as LinkTag[]) : []).map((link: LinkTag, index: number) => (
              <Draggable key={index} draggableId={String(index)} index={index}>
                {(provided) => (
                  <HStack
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={index}
                    spacing={1}
                  >
                    <Tag
                      size="sm"
                      variant="subtle"
                      borderRadius="sm"
                      colorScheme={link.color.includes("#") ? undefined : link.color}
                      bgColor={link.color.includes("#") ? hexToRgbA(link.color, 0.3) : undefined}
                      textColor={
                        link.color.includes("#") ? colorShade(link.color, -100) : undefined
                      }
                      cursor="pointer"
                      height="auto"
                    >
                      {link.label}
                    </Tag>
                    <IconButton
                      ml="1"
                      size="1xs"
                      aria-label="delete link tag"
                      icon={<DeleteIcon />}
                      onClick={() => onRemoveItem(index)}
                      variant="ghost"
                    />
                  </HStack>
                )}
              </Draggable>
            ))}
          </>
        );
    }
  };

  return (
    <Box pt={pt}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction={direction}>
          {(provided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Wrap p={0} m={0} spacing={3}>
                  <DragContent />
                </Wrap>
              </div>
              <span style={{ position: "absolute" }}>{provided.placeholder}</span>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DragAndDrop;
