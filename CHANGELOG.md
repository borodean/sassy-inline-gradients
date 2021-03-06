# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2021-06-18

### Changed

- Gradients are now interpolated in premultiplied RGBA space ([the way it actually happens in CSS](https://www.w3.org/TR/css-images-3/#premultiplied)) instead of linear RGBA.

## [1.1.0] - 2021-06-09

### Added

- The `optimize` option that minifies the output images. Only works in the
  asynchronous rendering mode.

## [1.0.0] - 2021-06-09

### Added

- First `inline-linear-gradient` implementation.

[1.1.0]: https://github.com/borodean/sassy-inline-gradients/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/borodean/sassy-inline-gradients/releases/tag/v1.0.0
