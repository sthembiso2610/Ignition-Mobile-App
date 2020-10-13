import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogingPage } from './loging.page';

describe('LogingPage', () => {
  let component: LogingPage;
  let fixture: ComponentFixture<LogingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
