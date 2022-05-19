import { Button, Box, Text, Animated, Filler, Panel, Content } from '../components';
import { Root, BgColor, PredefinedAnimationClass } from '../global';
import './app.css';

export function App(): JSX.Element {
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h1" size="xxlarge" color="color7">
          Text:
        </Text>
        <Text as="h2" color="color5">
          Sizes:
        </Text>
        <Box minFlex>
          <Text size="small">Lorem</Text>
          <Text size="medium">Lorem</Text>
          <Text size="large">Lorem</Text>
          <Text size="xlarge">Lorem</Text>
          <Text size="xxlarge">Lorem</Text>
        </Box>
        <Text as="h2" color="color5">
          Weight:
        </Text>
        <Box minFlex>
          <Text weight="light">Lorem</Text>
          <Text weight="regular">Lorem</Text>
          <Text weight="semibold">Lorem</Text>
        </Box>
        <Text as="h2" color="color5">
          Animations:
        </Text>
        <Box minFlex>
          <Text color="white" className={PredefinedAnimationClass.blink7}>
            Lorem
          </Text>
          <Text color="color7" className={PredefinedAnimationClass.blinkWhite}>
            Lorem
          </Text>
        </Box>
      </div>
      <div className="demo-card">
        <Text as="h2" size="xxlarge" color="color7">
          Button:
        </Text>

        <Text as="h2" color="color5">
          default:
        </Text>
        <Box minFlex>
          <Button>Button</Button>
          <Button counter={10}>Button</Button>
        </Box>
        <Text as="h2" color="color5">
          Colors:
        </Text>
        <Box minFlex>
          <Button bgColor={BgColor.color1}>Button</Button>
          <Button bgColor={BgColor.color2}>Button</Button>
          <Button bgColor={BgColor.color3}>Button</Button>
          <Button bgColor={BgColor.color4}>Button</Button>
          <Button bgColor={BgColor.color5}>Button</Button>
          <Button bgColor={BgColor.color6}>Button</Button>
          <Button bgColor={BgColor.color7}>Button</Button>
        </Box>
        <Text as="h2" color="color5">
          Accent side:
        </Text>
        <Box minFlex>
          <Button accentSide="none">Button</Button>
          <Button accentSide="both" width="min10">
            Button
          </Button>
          <Button accentSide="right">Button</Button>
          <Button accentSide="left">Button</Button>
        </Box>
        <Text as="h2" color="color5">
          withAccentLine:
        </Text>
        <Box minFlex>
          <Button accentSide="none" withAccentLine>
            Button
          </Button>
          <Button accentSide="both" withAccentLine>
            Button
          </Button>
          <Button accentSide="right" withAccentLine>
            Button
          </Button>
          <Button accentSide="left" withAccentLine>
            Button
          </Button>
        </Box>
        <Text as="h2" color="color5">
          Counter:
        </Text>
        <Box minFlex>
          <Button accentSide="right" withAccentLine counter={10}>
            Button
          </Button>
          <Button accentSide="left" counter={10}>
            Button
          </Button>
        </Box>
        <Text as="h2" color="color5">
          disabled:
        </Text>
        <Box minFlex>
          <Button disabled onClick={console.log} bgColor={BgColor.color1}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color2}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color3}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color4}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color5}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color6}>
            Button
          </Button>
          <Button disabled onClick={console.log} bgColor={BgColor.color7}>
            Button
          </Button>
        </Box>
        <Box minFlex>
          <Button disabled onClick={console.log} accentSide="none">
            Button
          </Button>
          <Button disabled onClick={console.log} accentSide="both" width="min10">
            Button
          </Button>
          <Button disabled onClick={console.log} accentSide="right">
            Button
          </Button>
          <Button disabled onClick={console.log} accentSide="left">
            Button
          </Button>
        </Box>
        <Box minFlex>
          <Button accentSide="none" withAccentLine disabled onClick={console.log}>
            Button
          </Button>
          <Button accentSide="both" withAccentLine disabled onClick={console.log}>
            Button
          </Button>
          <Button accentSide="right" withAccentLine disabled onClick={console.log}>
            Button
          </Button>
          <Button accentSide="left" withAccentLine disabled onClick={console.log}>
            Button
          </Button>
        </Box>
        <Box minFlex>
          <Button accentSide="right" withAccentLine counter={10} disabled onClick={console.log}>
            Button
          </Button>
          <Button accentSide="left" counter={10} disabled onClick={console.log}>
            Button
          </Button>
        </Box>
      </div>
      <div className="demo-card">
        <Text as="h2" size="xxlarge" color="color7">
          Animated:
        </Text>
        <Box minFlex>
          <Animated />
          <Animated wide />
        </Box>
      </div>
      <div className="demo-card">
        <Text as="h2" size="xxlarge" color="color7">
          Filler:
        </Text>
        <Box minFlex>
          <Filler size="small" />
          <Filler />
          <Filler size="wide" />
        </Box>
      </div>
      <div className="demo-card">
        <Text as="h2">Panel:</Text>
        <Text as="h2" color="color5">
          Vertical:
        </Text>
        <Panel vertical>
          <Filler />
          <Filler />
        </Panel>
        <Text as="h2" color="color5">
          Horizontal:
        </Text>
        <Panel>
          <Filler />
          <Filler />
        </Panel>
      </div>
      <div className="demo-card">
        <Text as="h2" size="xxlarge" color="color7">
          Content:
        </Text>
        <Content left={<Filler />} right={<Filler />}>
          <Filler />
        </Content>
      </div>
    </div>
  );
}
