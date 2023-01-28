import React, { useCallback, useState } from "react";
import { useAuthContext } from "../components/AuthContextProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import Loading from "../components/Loading";
import { useProjectEditView } from "../hooks/useProjectEditView";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Badge,
  HStack,
  Tag,
  Flex,
  Spacer,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  AvatarGroup,
  Avatar,
  IconButton,
  VStack,
  Portal,
  Link,
  Wrap,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  useMenuItem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
  Center,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  InfoOutlineIcon,
  LinkIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { GetProjectEditViewResponse, MemberInfo } from "../types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { ProjectInfo } from "@prisma/client";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";
import { Controller, useForm } from "react-hook-form";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import { Icon } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";

export type ProjectEditorForm = Omit<
  ProjectInfo,
  "id" | "updatedBy" | "updatedAt" | "approvedBy" | "approvedAt"
> & {
  members: MemberInfo[];
};

const ProjectEditor = ({
  id,
  project,
  members,
  onEditor,
  preview,
  onPreview,
  isPreview = false,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
  onEditor?: () => void;
  preview: boolean;
  onPreview?: () => void;
  isPreview?: boolean;
}) => {
  // TODO: When modified, disable the editor button. previewer now uses the edited project values
  // TODO: If the user edits, it should replace the current draft if it hasnt been approved
  // const [projectInfo, setProjectInfo] = useState(project);
  const { formState, handleSubmit, control, reset, getValues, setValue } =
    useForm<ProjectEditorForm>({
      defaultValues: {
        title: project.title,
        description: project.description,
        links: project.links,
        stack: project.stack as TechTag[], // this should be an array
        // stack: project.stack,
        imageUrls: project.imageUrls,
        recruiting: project.recruiting,
        recruitingFor: project.recruitingFor,
        members,
      },
    });

  const onSubmit = (data: ProjectEditorForm) => {
    const descriptionHtml = editor.getHTML();
    console.log(descriptionHtml);
    console.log("Form submitted: ", data);
    // editUserMutation.mutate(data, {
    //   onSuccess: (response) => {
    //     if (response.ok) {
    //       console.log("editUserMutation succeeded!");
    //       setIsEditing(false);
    //     } else {
    //       console.log("editUserMutation failed!");
    //       if (response.status === 401) {
    //         dispatch({ type: "logout" });
    //       }
    //     }
    //   },
    // });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "py-2.5 px-4 rounded-md mr-4 border border-chakraBorder",
      },
    },
    content: formState.defaultValues.description,
  });

  const removeTechTag = (index: number) => {
    const stack = getValues().stack;
    (stack as TechTag[]).splice(index, 1);
    setValue("stack", stack);
  };

  // TODO: Rename these for more generalized adds like the LinkTags
  const addTechTag = (tech: TechTag) => {
    const stack = getValues().stack;
    (stack as TechTag[]).push(tech);
    setValue("stack", stack);
    setTechSearch("");
  };

  // TODO: This can be separate from linkTagCustomizer because of the color diff
  const TechTagCustomizer = ({
    label: techLabel,
    onSubmit,
  }: {
    label: string;
    onSubmit: (tech: TechTag) => void;
  }) => {
    // TODO: Make callback functions to apply / add tag

    const [label, setLabel] = useState(techLabel);
    const [color, setColor] = useState("#333333");
    return (
      <ModalContent>
        <ModalHeader>Technology Customizer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid spacing={6} columns={2}>
            <HexColorPicker color={color} onChange={setColor} />
            <Wrap>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
              <Input
                value={color}
                onChange={(e) => {
                  if (!e.target.value.includes("#")) {
                    setColor("#" + e.target.value);
                  } else {
                    setColor(e.target.value);
                  }
                }}
              />
              <Spacer />

              <Center width="100%" height="auto">
                <Tag size="sm" variant="solid" borderRadius="sm" bgColor={color}>
                  {label}
                </Tag>
              </Center>
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => onSubmit({ label, color })}
                disabled={!techLabel.length}
                width="100%"
              >
                Add Stack
              </Button>
            </Wrap>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    );
  };

  const [techSearch, setTechSearch] = useState("");
  const [techSearchFocus, setTechSearchFocus] = useState(false);

  const navigationKeys = ["ArrowUp", "ArrowDown", "Escape"];
  const MenuInput = (props) => {
    const { role, ...rest } = useMenuItem(props);
    return (
      <Box px="3" role={role}>
        <Input
          placeholder="Enter technology"
          size="sm"
          {...rest}
          onKeyDown={(e) => {
            if (!navigationKeys.includes(e.key)) {
              e.stopPropagation();
            }
          }}
        />
      </Box>
    );
  };

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <CardBody>
      <Flex>
        <Box width="100%">
          <Wrap align="center" m="-1" p="1" mr="4" spacing="2">
            <FormControl isInvalid={!!formState.errors.title} width="auto" alignItems="flex-start">
              {!preview && <FormLabel>Title</FormLabel>}
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <Heading>{value}</Heading>
                    ) : (
                      <Input type="title" value={value} onChange={onChange} minWidth={300} />
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {!preview && <FormLabel ml="2">Recruiting</FormLabel>}
              <Controller
                control={control}
                name="recruiting"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <>
                        {value && (
                          <Badge colorScheme="cyan" display="block">
                            recruiting
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Switch ml="2" size="lg" isChecked={value} onChange={onChange} />
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
          </Wrap>
          <Box pt="5">
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {!preview ? (
                <FormLabel>Description</FormLabel>
              ) : (
                <Heading pb="2">Description</Heading>
              )}
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() }} />
                    ) : (
                      <EditorContent editor={editor} value={value} onChange={onChange} />
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
          </Box>

          <Box pt="5">
            <FormControl isInvalid={!!formState.errors.title} width="100%">
              {!preview ? (
                <>
                  <FormLabel>Stack</FormLabel>
                  <Wrap>
                    <Box>
                      {/* isOpen={techSearchFocus}  */}
                      <Menu
                        placement="right-start"
                        onOpen={() => setTechSearchFocus(true)}
                        onClose={() => setTechSearchFocus(false)}
                      >
                        {/* <Input
                                type="title"
                                minWidth={300}
                                onChange={(e) => setTechSearch(e.target.value)}
                                onFocus={() => setTechSearchFocus(true)}
                                onBlur={() => setTechSearchFocus(false)}
                              /> */}
                        <MenuButton as={IconButton} alignItems="center">
                          {/* When click on add, the search is focused */}
                          {/* When the search is focused or the search is not empty, change icon */}
                          {/* Instead of using two different icons, can we rotate one? */}
                          {techSearchFocus ? (
                            <Icon as={CloseIcon} boxSize={5} />
                          ) : (
                            <Icon as={AddIcon} boxSize={5} />
                          )}
                        </MenuButton>
                        <MenuList>
                          <MenuInput
                            type="title"
                            onChange={(e) => setTechSearch(e.target.value)}
                            // onFocus={() => setTechSearchFocus(true)}
                            // onBlur={() => setTechSearchFocus(false)}
                            value={techSearch}
                          />
                          {
                            <>
                              {!!techSearch.length && (
                                <MenuItem onClick={onOpen}>
                                  <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <TechTagCustomizer label={techSearch} onSubmit={addTechTag} />
                                  </Modal>
                                  {/* Doesnt have to be on the Red menu button */}
                                  {/* Can open on input focus */}
                                  <Tag
                                    size="sm"
                                    variant="solid"
                                    borderRadius="sm"
                                    bgColor="#333"
                                    cursor="pointer"
                                  >
                                    {techSearch}
                                  </Tag>
                                </MenuItem>
                              )}

                              {mockData.presetStack.map((techPreset: TechTag, index: number) => (
                                <>
                                  {techPreset.label
                                    .toLowerCase()
                                    .includes(techSearch.toLowerCase()) && (
                                    <MenuItem
                                      key={index}
                                      onClick={() => {
                                        addTechTag({
                                          label: techPreset.label,
                                          color: techPreset.color,
                                        });
                                        setTechSearch("");
                                      }}
                                    >
                                      <Tag
                                        size="sm"
                                        variant="solid"
                                        borderRadius="sm"
                                        colorScheme={techPreset.color}
                                        cursor="pointer"
                                      >
                                        {techPreset.label}
                                      </Tag>
                                    </MenuItem>
                                  )}
                                </>
                              ))}
                            </>
                          }
                        </MenuList>
                      </Menu>
                    </Box>
                  </Wrap>
                </>
              ) : (
                <Heading pb="2">Stack</Heading>
              )}
              <Controller
                control={control}
                name="stack"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <Wrap pt="2">
                        {/* TODO: unsafe casting, we have no way of invariating value */}
                        {(value as TechTag[]).map((tech: TechTag, index) => (
                          <Tag
                            key={index}
                            size="sm"
                            variant="solid"
                            borderRadius="sm"
                            colorScheme={tech.color.includes("#") ? undefined : tech.color}
                            bgColor={tech.color.includes("#") ? tech.color : undefined}
                          >
                            {tech.label}
                          </Tag>
                        ))}
                      </Wrap>
                    ) : (
                      <Wrap pt="2">
                        {/* Need react beautiful dnd */}
                        {/* Have a "drag here to delete" box */}
                        {/* TODO: unsafe casting, we have no way of invariating value */}
                        {(value as TechTag[]).map((tech: TechTag, index) => (
                          <Tag
                            key={index}
                            size="sm"
                            variant="solid"
                            borderRadius="sm"
                            colorScheme={tech.color.includes("#") ? undefined : tech.color}
                            bgColor={tech.color.includes("#") ? tech.color : undefined}
                            onClick={(e) => removeTechTag(index)}
                            cursor="pointer"
                            height="auto"
                          >
                            <TagLabel>{tech.label}</TagLabel>
                            <TagRightIcon boxSize={2.5} as={CloseIcon} />
                          </Tag>
                        ))}
                      </Wrap>
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
          </Box>

          <Box pt="5">
            <Heading>Links</Heading>
            <Wrap pt="2">
              {mockData.links.map((link: LinkTag, index) => (
                <Link href={link.url} key={index} lineHeight={1} isExternal>
                  <Tag size="sm" variant="subtle" borderRadius="sm" colorScheme={link.color}>
                    <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                    <TagLabel ml={-1}>{link.label}</TagLabel>
                  </Tag>
                </Link>
              ))}
            </Wrap>
          </Box>
        </Box>
        <Spacer />
        {isPreview && (
          <ProjectSideButtons
            id={id}
            project={project}
            members={members}
            onEditor={onEditor}
            preview={preview}
            onPreview={onPreview}
            isPreview
          />
        )}
      </Flex>

      <Box pt="5">
        <Heading>Images</Heading>
        <div>
          <ScrollContainer className="list mt-4 mb-1 flex overflow-auto" hideScrollbars={false}>
            {mockData.images.map((image: ImageInfo, index: number) => (
              <div
                key={index}
                className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
              >
                <Image
                  loading="eager"
                  src={image.url}
                  // height={height}
                  height={400}
                  width={400}
                  // objectFit="cover"
                  alt={image.aria}
                />
              </div>
            ))}
          </ScrollContainer>
        </div>
      </Box>
      <Box pt="5">
        <Heading>Project Members</Heading>
        <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {}
          {members.map((member: MemberInfo) => (
            // TODO: members does not have users where isCredited is false
            // TODO: Need to change backend to return info to the lead about members
            // TODO: We only need the isCredited for public project view endpoint
            <Card size="sm" key={member.id}>
              <CardBody>
                <Flex>
                  <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
                  <Box ml="3">
                    <Text fontWeight="bold">{member.displayName ?? member.username}</Text>
                    <Text fontSize="sm">Member</Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </CardBody>
  );
};

export default ProjectEditor;
