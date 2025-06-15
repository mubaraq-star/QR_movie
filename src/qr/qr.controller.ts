import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QrService } from './qr.service';

@ApiTags('qr')
@Controller()
export class QrController {
  constructor(private qrService: QrService) {}

  @Get('qr')
  @ApiOperation({ summary: 'Get the current QR code page' })
  @ApiResponse({
    status: 200,
    description: 'Renders an HTML page with a QR code that auto-refreshes every 10 s',
  })
  @Render('qr')
  async showQr() {
    const qrImage = await this.qrService.getQrDataUrl();
    return { qrImage, refreshSec: 10 };
  }
}
