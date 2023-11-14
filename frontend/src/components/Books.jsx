import { Card, Heading, Image, Text, VStack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card
        key={id}
        my={4}
        p={4}
        cursor="pointer"
        borderRadius="lg"
        transition="0.3s"
        _hover={{ boxShadow: "lg" }}
      >
        <VStack spacing={1} align="center">
          <Box
            w="100%"
            h="120px"
            overflow="hidden"
            borderRadius="md"
            boxShadow="base"
          >
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={`http://localhost:8000/${image}`}
              alt={title}
            />
          </Box>
          <Heading size="md">{title} ({year})</Heading>
          <Text>{author}</Text>
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}