import './home.css';
import React, { Suspense } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode, Button,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { RiCopyrightLine } from 'react-icons/ri';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import ResetPrompt from '../components/ResetPrompt';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/Packages';

interface AppProps {
}

const homeContent = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const PackageContent: React.FC<AppProps> = (props) => (
  <Flex py={4}>
    <PackagesView />
  </Flex>
);
const moreContent = (
  <Flex py={4}>
    <Text>Test</Text>
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}><PackageContent /></Suspense> },
    { label: 'More', icon: GiSettingsKnobs, content: moreContent },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    nextStep, prevStep, reset, activeStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <VStack>
      <VStack width="100%" p={5} marginTop={55}>
        <Steps activeStep={activeStep}>
          {steps.map(({ label, content, icon }) => (
            <Step label={label} key={label} icon={icon}>
              {content}
            </Step>
          ))}
        </Steps>

      </VStack>
      <Flex
        position="fixed"
        padding={5}
        w="100%"
      >
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        {activeStep === 3 ? (
          <ResetPrompt onReset={reset} />
        ) : (
          <StepButtons
            {...{ nextStep, prevStep }}
            prevDisabled={activeStep === 0}
          />
        )}
      </Flex>

      <Button leftIcon={<RiCopyrightLine />} colorScheme="gray" variant="outline">
        <a href="http://google.com" target="_blank" rel="noreferrer"> Manjaro</a>
      </Button>
    </VStack>

  );
};

export default App;
