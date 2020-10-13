import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefuelPage } from './refuel.page';

describe('RefuelPage', () => {
  let component: RefuelPage;
  let fixture: ComponentFixture<RefuelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
