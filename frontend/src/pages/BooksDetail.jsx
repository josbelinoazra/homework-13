import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex my="6" align="center">
          <Image
            src={`http://localhost:8000/${book.image}`}
            alt={book.title}
            boxSize="300px"
            objectFit="cover"
            borderRadius="md"
            mr="8"
          />
          <Box>
            <Heading as="h1" size="xl" mb="2">
              {book.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" fontWeight="semibold" mb="2">
              {book.author}
            </Text>
            <Text fontSize="lg" color="gray.600" fontWeight="semibold" mb="2">
              {book.publisher}
            </Text>
            <Text fontSize="lg" color="gray.600" fontWeight="semibold" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      <HStack spacing="4" mt="4">
        <Button onClick={() => navigate(-1)}>Back</Button>
        {localStorage.getItem('token') && (
          <>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red">Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} colorScheme="red">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link to={`/editbook/${id}`}>
              <Button>Edit</Button>
            </Link>
          </>
        )}
      </HStack>
    </Box>
  );
}