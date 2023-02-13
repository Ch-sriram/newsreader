import {
  Box,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Link,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';

export type CardProps = {
  heading: string;
  summary: string;
  dateDetails: string;
  link: string;
  author: string;
  imageLink: string;
};

const Card = (props: CardProps) => {
  return (
    <ChakraCard borderWidth={2} borderBlockEndWidth={10} _hover={{}}>
      <CardHeader>
        <Link href={props.link} isExternal>
          <Heading size="md">
            <span dangerouslySetInnerHTML={{__html: props.heading}}></span>
          </Heading>
          <Image
            src={props.imageLink}
            alt={props.imageLink}
            width={'100%'}
            border={'1px'}
            style={{ marginTop: '10px' }}
          />
        </Link>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Excerpt
            </Heading>
            <Text pt="2" fontSize="sm">
              <span dangerouslySetInnerHTML={{__html: props.summary}}></span>
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              More Details
            </Heading>
            <Text pt="2" fontSize="sm">
              <strong style={{ color: 'grey' }}>Author</strong>: {props.author}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Text size="xs" textColor="gray">
          {props.dateDetails}
        </Text>
      </CardFooter>
    </ChakraCard>
  );
};

export default Card;
